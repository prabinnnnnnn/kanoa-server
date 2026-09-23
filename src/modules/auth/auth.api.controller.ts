import { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { refreshTokenCookieOptions } from "../../config/cookies.config.js";
import { handleError } from "../../utils/error-handler.utils.js";


export class AuthApiController {
    constructor(private readonly service = authService) { }

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({
                    success: false,
                    message: "Email and password are required"
                });
                return;
            }

            const userAgent =
                req.headers["user-agent"] ?? null;

            const ipAddress =
                req.ip ?? null;

            const result =
                await this.service.login(
                    email,
                    password,
                    userAgent,
                    ipAddress
                );

            res.cookie(
                "refreshToken",
                result.refreshToken,
                refreshTokenCookieOptions
            );

            res.status(200).json({
                success: true,
                message: "Login successful",
                data: {
                    accessToken:
                        result.accessToken,

                    user: {
                        id: result.user.id,
                        name: result.user.name,
                        email: result.user.email,
                        role: result.user.role,
                    },
                },
            });
        } catch (error) {
            handleError(
                req,
                res,
                error,
                "/api/auth/login",
                "Unable to login"
            );
        }
    };
}

export const authApiController = new AuthApiController() 