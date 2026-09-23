import { Request, Response } from "express";
import { ArtistService } from "./artist.service.js";
import { notFoundResponse, successResponse } from "../../utils/api.response.utils.js";

export class ArtistApiController {

    constructor(private readonly service: ArtistService) { }

    getAll = async (req: Request, res: Response): Promise<void> => {
        const artists = await this.service.getAll();
        successResponse(res, artists)
    };

    getById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const artist = await this.service.getById(req.params.id);

        if (!artist) {
            notFoundResponse(
                res,
                "Artist not found",
                req.requestId
            );
            return;
        }
        successResponse(res, artist)

    };

    getBySlug = async (req: Request<{ slug: string }>, res: Response): Promise<void> => {
        const { slug } = req.params
        const artist = await this.service.getBySlug(slug);

        if (!artist) {
            notFoundResponse(
                res,
                "Artist not found",
                req.requestId
            );
            return;
        }
        successResponse(res, artist)
    };
}