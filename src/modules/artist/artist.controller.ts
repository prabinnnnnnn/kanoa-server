import { Request, Response } from "express";
import { ArtistService } from "./artist.service.js";

export class ArtistController {

    constructor(private readonly service: ArtistService) { }

    create = async (req: Request, res: Response): Promise<void> => {

        try {
            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };

            const image = files.image?.[0];
            const coverImage = files.coverImage?.[0];

            await this.service.create({
                name: req.body.name,
                slug: req.body.slug,
                bio: req.body.bio || null,
                genre: req.body.genre || null,
                content: req.body.content || null,
                image: image?.path || "",
                coverImage: coverImage?.path || "",
            });

            req.flash('success', "Artist Created Successfully");
            res.redirect("/artists");

        } catch (error: any) {
            req.flash('error', error.message);
            res.redirect("/artists");
        }
    };

    update = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        const image = files?.image?.[0];
        const coverImage = files?.coverImage?.[0];

        const data = {
            name: req.body.name,
            slug: req.body.slug,
            bio: req.body.bio || null,
            genre: req.body.genre || null,
            content: req.body.content || null,

            ...(image && {
                image: image.path,
            }),

            ...(coverImage && {
                coverImage: coverImage.path,
            }),
        };

        const artist = await this.service.update(
            req.params.id,
            data
        );

        if (!artist) {
            res.status(404).json({
                success: false,
                message: "Artist not found",
            });
            return;
        }

        req.flash("success", "Artist Updated Successfully");
        res.redirect("/artists");
    };

    delete = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const deleted = await this.service.delete(req.params.id);

        if (!deleted) {
            res.status(404).json({
                success: false,
                message: "artist not found",
            });
            return;
        }
        req.flash('success', "Artist Delete Successfully");
        res.redirect("/artists");

        // res.status(200).json({
        //     success: true,
        //     message: "artist deleted successfully",
        // });
    };
}