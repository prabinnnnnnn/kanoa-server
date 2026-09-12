import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";

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

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.service.create(req.body);
            req.flash("success", "User Created Successfully");
            res.redirect("/");

        } catch (error) {
            req.flash("error", "Failed to Created User");
            res.redirect("/auth/register");
        }
    }
}