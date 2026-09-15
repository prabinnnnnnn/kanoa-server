import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { handleError } from "../../utils/error-handler.js";
import bcrypt from "bcrypt"
import { AppError } from "../../errors/app.error.js";

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
                req.flash("error", "Email and password are required");

                res.redirect("/auth/login");
                return;
            }


            const user = await this.service.login(email, password);

            if (!user) {
                req.flash("error", "User not found");

                res.redirect("/auth/login");
                return;
            }

            req.session.regenerate((error) => {
                if (error) {
                    console.error("Session regeneration error:", error);

                    req.flash("error", "Unable to login. Please try again.");
                    res.redirect("/auth/login");
                    return;
                }

                req.session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };

                req.session.ip = req.ip;

                req.session.userAgent =
                    req.headers["user-agent"];

                req.flash("success", `Welcome ${user.name}`);

                res.redirect("/");
            });
        } catch (error) {
            handleError(req, res, error, "/auth/login", "Something went wrong. Please try again.")
            console.error("Login error:", error);
        }
    };

    logout = async (req: Request, res: Response) => {
        req.session.destroy((error) => {
            if (error) {
                console.error(
                    "Session destroy error:",
                    error,
                );

                res.redirect("/");
                return;
            }
            res.redirect("/auth/login");
        });
    }

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

        console.log("oldpassword", oldPassword)
        console.log("newPassword", newPassword)

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

        console.log(user)

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
}