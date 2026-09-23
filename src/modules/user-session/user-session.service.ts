import { AppError } from "../../errors/app.error.js";
import { hashToken } from "../../utils/hash.utils.js";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt.utils.js";
import { UserSessionRepository } from "./user-session.repository.js";
import { CreateUserSessionInput } from "./user-session.types.js";


export class UserSessionService {
    constructor(private readonly repository: UserSessionRepository) { }

    public async createSession(data: CreateUserSessionInput) {
        return this.repository.create(data);
    }

    public async getSessionById(id: string) {
        return this.repository.findById(id);
    }

    public async getSessionByRefreshTokenHash(refreshTokenHash: string) {
        return this.repository.findByRefreshTokenHash(
            refreshTokenHash
        );
    }

    public async getActiveSessions(userId: string) {
        return this.repository.findByUserId(userId);
    }

    public async revokeSession(id: string) {
        return this.repository.revoke(id);
    }

    public async revokeAllSessions(userId: string) {
        return this.repository.revokeAllByUserId(userId);
    }

    public async getSessionByIdWithUser(id: string) {
        return this.repository.findByIdWithUser(id);
    }

    public async refresh(refreshToken: string): Promise<string> {
        const payload = verifyRefreshToken(refreshToken);

        const session = await userSessionService.getSessionById(payload.sid);

        if (!session) {
            throw new AppError("Session not found", 401);
        }

        if (session.revokedAt) {
            throw new AppError("Session has been revoked", 401);
        }

        if (session.expiresAt < new Date()) {
            throw new AppError("Refresh session has expired", 401);
        }

        const refreshTokenHash = hashToken(refreshToken);

        if (
            refreshTokenHash !== session.refreshTokenHash
        ) {
            throw new AppError("Invalid refresh token", 401);
        }

        const accessToken = generateAccessToken({
            sub: payload.sub,
            role: "user",
        });

        return accessToken;
    }
}

export const userSessionService = new UserSessionService(new UserSessionRepository)