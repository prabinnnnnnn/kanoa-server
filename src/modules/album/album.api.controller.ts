import { Request, Response } from "express";
import { AlbumService } from "./album.service.js";
import { errorResponse, notFoundResponse, successResponse } from "../../utils/api.response.utils.js";

export class AlbumApiController {
    constructor(private readonly service: AlbumService) { }

    getAll = async (req: Request, res: Response): Promise<void> => {
        const albums = await this.service.getAll();
        successResponse(res, albums)
    };

    getById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const album = await this.service.getById(req.params.id);

        if (!album) {
            notFoundResponse(
                res,
                "Album not found",
                req.requestId
            );
        }
        successResponse(res, album)

    };
}