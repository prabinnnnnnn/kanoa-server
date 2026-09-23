import env from "../../config/env.js";
import { AppError } from "../../errors/app.error.js";
import { EmailService } from "../../services/email.service.js";
import { hashToken } from "../../utils/hash.utils.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt.utils.js";
import { userSessionService } from "../user-session/user-session.service.js";
import { User } from "./auth.model.js";
import { AuthRepository } from "./auth.repository.js";
import { LoginResult, RefreshResult, UserCreationAttributes, UserUpdateAttributes } from "./auth.types.js";
import bcrypt from "bcrypt"
import crypto, { randomUUID } from "node:crypto";

export class AuthService {
    private emailService: EmailService;

    constructor(private readonly repository: AuthRepository, emailService: EmailService) {
        this.emailService = emailService;
    }

    async getAll(): Promise<User[]> {
        return this.repository.getAll();
    }

    async getById(id: string): Promise<User | null> {
        return this.repository.getById(id);
    }

    async verifyEmail(token: string): Promise<void> {
        const user = await this.repository.getUserByVerificationToken(token);

        if (!user) {
            throw new AppError(
                "Invalid verification token",
                400,
            );
        }

        if (
            !user.emailVerificationExpires ||
            user.emailVerificationExpires < new Date()
        ) {
            throw new AppError(
                "Verification token has expired",
                400,
            );
        }

        await this.repository.verifyEmail(user.id);
    }

    async create(data: UserCreationAttributes): Promise<UserCreationAttributes> {
        const hashedPassword = await bcrypt.hash(data.password, 12);

        const token = crypto.randomBytes(32).toString("hex");

        const expires = new Date(
            Date.now() + 1000 * 60 * 30,
        );
        const user = await this.repository.create({
            ...data,
            password: hashedPassword,
            emailVerificationToken: token,
            emailVerificationExpires: expires,
        });

        await this.emailService.sendVerificationEmail(user.email, token)
        return user
    }

    async login(email: string, password: string, userAgent: string | null, ipAddress: string | null): Promise<LoginResult> {
        const user = await this.repository.getUserByEmail(email);

        if (!user) {
            throw new AppError(
                "User not found",
                404
            );
        }

        if (!user.isActive) {
            throw new AppError(
                "Account is inactive",
                400
            );
        }

        if (!user.isEmailVerified) {
            throw new AppError(
                "Please verify your email before logging in.",
                403
            );
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            throw new AppError(
                "Invalid credentials",
                403
            );
        }

        // Create a unique session ID
        const sessionId = randomUUID();

        // Generate access token
        const accessToken = generateAccessToken({
            sub: user.id,
            role: user.role,
        });

        // Generate refresh token
        const refreshToken = generateRefreshToken({
            sub: user.id,
            sid: sessionId,
            type: "refresh",
        });

        // Hash refresh token before storing it
        const refreshTokenHash = hashToken(refreshToken);

        // Refresh token expires in 7 days
        const expiresAt = new Date(
            Date.now() +
            env.JWT_REFRESH_EXPIRES_IN * 1000
        );

        // Store session
        await userSessionService.createSession({
            id: sessionId,
            userId: user.id,
            refreshTokenHash,
            userAgent,
            ipAddress,
            expiresAt,
        });

        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    async logout(refreshToken: string): Promise<void> {
        console.log("Logout service called");

        const payload = verifyRefreshToken(refreshToken);

        console.log("Refresh payload:", payload);

        const session =
            await userSessionService.getSessionById(
                payload.sid
            );

        console.log("Session found:", session?.id);

        if (!session) {
            console.log("Session not found");
            return;
        }

        console.log(
            "Before revoke:",
            session.revokedAt
        );

        await userSessionService.revokeSession(
            session.id
        );

        console.log("Session revoked:", session.id);
    }

    async update(id: string, data: UserUpdateAttributes): Promise<UserUpdateAttributes | null> {
        return this.repository.update(id, data);
    }

    async delete(id: string, currentUserId: string,): Promise<boolean> {
        if (id === currentUserId) {
            throw new AppError("You cannot delete your own account", 403);
        }

        return this.repository.delete(id);
    }

    async getByEmail(params: string): Promise<User | null> {
        return this.repository.getUserByEmail(params)
    }

    async refresh(refreshToken: string, userAgent: string | null, ipAddress: string | null): Promise<RefreshResult> {
        // 1. Verify refresh token
        const payload = verifyRefreshToken(refreshToken);

        // 2. Find old session
        const session =
            await userSessionService.getSessionByIdWithUser(
                payload.sid
            );

        if (!session) {
            throw new AppError("Session not found", 401);
        }

        // 3. Check revoked
        if (session.revokedAt) {
            throw new AppError(
                "Session has been revoked",
                401
            );
        }

        // 4. Check expiry
        if (session.expiresAt <= new Date()) {
            throw new AppError(
                "Refresh session has expired",
                401
            );
        }

        // 5. Check refresh token hash
        const refreshTokenHash =
            hashToken(refreshToken);

        if (
            refreshTokenHash !==
            session.refreshTokenHash
        ) {
            throw new AppError(
                "Invalid refresh token",
                401
            );
        }

        // 6. Check user
        if (!session.user) {
            throw new AppError(
                "User not found",
                401
            );
        }

        if (!session.user.isActive) {
            throw new AppError(
                "Account is inactive",
                403
            );
        }

        // --------------------------------
        // 7. Revoke OLD session
        // --------------------------------

        await userSessionService.revokeSession(
            session.id
        );

        // --------------------------------
        // 8. Create NEW session ID
        // --------------------------------

        const newSessionId = randomUUID();

        // --------------------------------
        // 9. Create new tokens
        // --------------------------------

        const accessToken =
            generateAccessToken({
                sub: session.user.id,
                role: session.user.role,
            });

        const newRefreshToken =
            generateRefreshToken({
                sub: session.user.id,
                sid: newSessionId,
                type: "refresh",
            });

        // --------------------------------
        // 10. Hash NEW refresh token
        // --------------------------------

        const newRefreshTokenHash =
            hashToken(newRefreshToken);

        // --------------------------------
        // 11. New session expiry
        // --------------------------------

        const expiresAt = new Date(
            Date.now() +
            env.JWT_REFRESH_EXPIRES_IN * 1000
        );

        // --------------------------------
        // 12. CREATE NEW DATABASE SESSION
        // --------------------------------

        await userSessionService.createSession({
            id: newSessionId,
            userId: session.user.id,
            refreshTokenHash: newRefreshTokenHash,
            userAgent,
            ipAddress,
            expiresAt,
        });

        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    }
}

export const authService = new AuthService(new AuthRepository, new EmailService)