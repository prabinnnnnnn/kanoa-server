import { mailTransporter } from "../../config/mail.js";
import { AppError } from "../../errors/app.error.js";
import { EmailService } from "../../services/email.service.js";
import { User } from "./auth.model.js";
import { AuthRepository } from "./auth.repository.js";
import { UserCreationAttributes, UserUpdateAttributes } from "./auth.types.js";
import bcrypt from "bcrypt"
import crypto from "node:crypto";

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


    async login(email: string, password: string): Promise<User | null> {
        const user = await this.repository.getUserByEmail(email);

        if (!user?.isEmailVerified) {
            throw new AppError(
                "Please verify your email before logging in.",
                403,
            );
        }

        if (!user) {
            throw new AppError("User not Found", 404);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new AppError("Invalide Credential", 403);
        }

        return user;
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
}