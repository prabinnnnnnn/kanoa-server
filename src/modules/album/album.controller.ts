import { Request, Response } from "express";
import { AlbumService } from "./album.service.js";

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
            await this.service.create({
                ...req.body,
                coverImage: req.file?.path,
            });

            req.flash("success", "Album Created Successfully");
            res.redirect("/albums");

        } catch (error) {

            req.flash("error", "Failed to Created Album");
            res.redirect("/albums");
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