import { Request, Response } from "express";
import { SongService } from "./song.service.js";

export class SongController {
    constructor(private readonly service: SongService) { }

    getAll = async (req: Request, res: Response): Promise<void> => {
        const songs = await this.service.getAll();

        res.status(200).json({
            success: true,
            data: songs,
        });
    };

    getById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const song = await this.service.getById(req.params.id);

        if (!song) {
            res.status(404).json({
                success: false,
                message: "song not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: song,
        });
    };

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };

            const image = files?.image?.[0];
            const coverImage = files?.coverImage?.[0];

            await this.service.create({
                ...req.body,
                isPopular: req.body.isPopular === 'on' ? true : false,
                isTrending: req.body.isTrending === "on" ? true : false,
                coverImage: coverImage?.path || "",
                image: image?.path || "",
            });

            req.flash("success", "Song created successfully");
            res.redirect("/songs");

        } catch (error) {
            console.error("Failed to create song:", error);

            const message = error instanceof Error
                ? error.message
                : "Unknown error";

            req.flash("error", `Failed to create song: ${message}`);
            res.redirect("/songs");
        }
    };

    update = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        try {
            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };

            const image = files?.image?.[0];
            const coverImage = files?.coverImage?.[0];

            const song = await this.service.update(
                req.params.id,
                {
                    ...req.body,

                    isPopular: req.body.isPopular === "on",
                    isTrending: req.body.isTrending === "on",

                    ...(image && {
                        image: image.path,
                    }),

                    ...(coverImage && {
                        coverImage: coverImage.path,
                    }),
                }
            );

            if (!song) {
                req.flash("error", "Song not found");
                res.redirect("/songs");
                return;
            }

            req.flash("success", "Song updated successfully");
            res.redirect("/songs");

        } catch (error) {
            console.error("Failed to update song:", error);

            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to update song";

            req.flash("error", message);
            res.redirect("/songs");
        }
    };

    delete = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const deleted = await this.service.delete(req.params.id);

        if (!deleted) {
            res.status(404).json({
                success: false,
                message: "song not found",
            });
            return;
        }
        req.flash("success", "song Deleted Successfully");
        res.redirect("/songs");
        // res.status(200).json({
        //     success: true,
        //     message: "song deleted successfully",
        // });
    };
}