import { Request, Response } from "express";
import { AlbumService } from "./album.service.js";
import { handleError } from "../../utils/error-handler.utils.js";
import { AppError } from "../../errors/app.error.js";

export class AlbumController {
    constructor(private readonly service: AlbumService) { }

    getAll = async (req: Request, res: Response): Promise<void> => {
        const albums = await this.service.getAll();

        res.status(200).json({
            success: true,
            data: albums,
        });
    };

    getById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const album = await this.service.getById(req.params.id);

        if (!album) {
            res.status(404).json({
                success: false,
                message: "Album not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: album,
        });
    };

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.file) {
                new AppError("Cover image is required", 4000);
                return
            }
            if (!req.file.path) {
                new AppError("Failed to upload cover image", 400)
                return
            }
            await this.service.create({
                ...req.body,
                coverImage: req.file?.path,
            });

            req.flash("success", "Album Created Successfully");
            res.redirect("/albums");

        } catch (error) {
            handleError(req, res, error, "/albums", "Failed to Created Album")
        }

    };

    update = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        try {
            const album = await this.service.update(
                req.params.id,
                {
                    ...req.body,
                    ...(req.file?.path && {
                        coverImage: req.file.path
                    })
                }
            );

            if (!album) {
                req.flash("error", "Failed to Update Album");
                res.redirect("/albums");
                return;
            }

            req.flash("success", "Album Updated Successfully");
            res.redirect("/albums");

        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Failed to Update Album";

            req.flash("error", message);
            res.redirect("/albums");
        }
    };

    delete = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const deleted = await this.service.delete(req.params.id);

        if (!deleted) {
            res.status(404).json({
                success: false,
                message: "Album not found",
            });
            return;
        }
        req.flash("success", "Album Deleted Successfully");
        res.redirect("/albums");
        // res.status(200).json({
        //     success: true,
        //     message: "Album deleted successfully",
        // });
    };
}