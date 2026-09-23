import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { handleError } from "../../utils/error-handler.utils.js";
import bcrypt from "bcrypt"
import { refreshTokenCookieOptions } from "../../config/cookies.config.js";

export class AuthController {
    constructor(private readonly service: AuthService) { }

    getAll = async (req: Request, res: Response): Promise<void> => {
        const songs = await this.service.getAll();

        res.status(200).json({
            success: true,
            data: songs,
        });
    };

    getById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const user = await this.service.getById(req.params.id);

        if (!user) {
            res.status(404).json({
                success: false,
                message: "user not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    };

    verifyEmail = async (req: Request<{ token: string }>, res: Response): Promise<void> => {
        try {
            const { token } = req.params;

            if (!token) {
                req.flash("error", "Invalid verification link");
                res.redirect("/auth/login");
                return;
            }

            await this.service.verifyEmail(token);

            req.flash(
                "success",
                "Email verified successfully",
            );

            res.redirect("/auth/login");
        } catch (error) {
            handleError(req, res, error, "/auth/login", "Email verification failed");
        }
    };

    register = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.service.create(req.body);

            req.flash(
                "success",
                "Account created. Please check your email to verify your account.",
            );

            res.redirect("/auth/login");

        } catch (error) {
            req.flash("error", "Failed to Created User");
            res.redirect("/auth/register");
        }
    }

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                req.flash(
                    "error",
                    "Email and password are required"
                );

                res.redirect("/auth/login");
                return;
            }

            const userAgent =
                req.headers["user-agent"] ?? null;

            const ipAddress = req.ip ?? null;

            const result = await this.service.login(
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

            req.session.regenerate((error) => {
                if (error) {
                    console.error(
                        "Session regeneration error:",
                        error
                    );

                    req.flash(
                        "error",
                        "Unable to login. Please try again."
                    );

                    res.redirect("/auth/login");
                    return;
                }

                req.session.user = {
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email,
                    role: result.user.role,
                };

                req.session.ip = ipAddress;
                req.session.userAgent = userAgent;

                req.flash(
                    "success",
                    `Welcome ${result.user.name}`
                );

                res.redirect("/");
            });
        } catch (error) {
            handleError(
                req,
                res,
                error,
                "/auth/login",
                "Something went wrong. Please try again."
            );

            console.error(
                "Login error:",
                error
            );
        }
    };

    logout = async (req: Request, res: Response): Promise<void> => {
        try {
            const refreshToken = req.cookies.refreshToken;

            console.log("Logout called");
            console.log("Refresh token exists:", !!refreshToken);
            console.log("Refresh token:", refreshToken);

            if (refreshToken) {
                await this.service.logout(refreshToken);
                console.log("JWT session revoked");
            } else {
                console.log("No refresh token found");
            }

            req.session.destroy((error) => {
                if (error) {
                    console.error(
                        "Session destroy error:",
                        error
                    );
                }
            });

            res.clearCookie(
                "refreshToken",
                refreshTokenCookieOptions
            );

            res.redirect("/auth/login");
        } catch (error) {
            console.error("Logout error:", error);

            res.redirect("/auth/login");
        }
    };

    delete = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id) {
                req.flash("error", "User ID is required");
                res.redirect("/auth/users");
                return;
            }

            const deleted = await this.service.delete(id, req.session.user!.id);

            if (!deleted) {
                req.flash("error", "User not found");
                res.redirect("/auth/users");
                return;
            }

            req.flash("success", "User deleted successfully");
            res.redirect("/auth/users");
        } catch (error) {
            handleError(
                req,
                res,
                error,
                "/auth/users",
                "Failed to delete user",
            );
        }
    };

    changePassword = async (req: Request, res: Response): Promise<void> => {
        const { oldPassword, newPassword } = req.body;

        const userId = req.session.user?.id;


        if (!userId) {
            req.flash("error", "You must be logged in");
            return res.redirect("/auth/login");
        }

        if (!oldPassword || !newPassword) {
            req.flash("error", "Old password and new password are required");
            return res.redirect("/auth/profile");
        }

        const user = await this.service.getById(userId);

        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/auth/profile');
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordValid) {
            req.flash('error', 'Old password is incorrect');
            return res.redirect('/auth/profile');
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 12);

        await user?.update({
            password: newHashedPassword
        })
        req.flash('success', 'Password reset successfully');
        this.logout(req, res)
    }

    refresh = async (req: Request, res: Response): Promise<void> => {
        try {
            const refreshToken =
                req.cookies.refreshToken;

            if (!refreshToken) {
                res.status(401).json({
                    message: "Refresh token not found",
                });
                return;
            }

            const userAgent = req.headers["user-agent"] ?? null;

            const ipAddress = req.ip ?? null;

            const result = await this.service.refresh(
                refreshToken,
                userAgent,
                ipAddress
            );

            // IMPORTANT
            res.cookie(
                "refreshToken",
                result.refreshToken,
                refreshTokenCookieOptions
            );

            res.status(200).json({
                accessToken: result.accessToken,
            });
        } catch (error) {
            handleError(req, res, error, "/auth/login", "Unable to refresh access token");

            console.error("Refresh token error:", error);
        }
    };
}