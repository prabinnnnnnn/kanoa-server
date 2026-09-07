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
        const album = await this.service.create(req.body);

        res.status(201).json({
            success: true,
            message: "Album created successfully",
            data: album,
        });
    };

    update = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const album = await this.service.update(
            req.params.id,
            req.body
        );

        if (!album) {
            res.status(404).json({
                success: false,
                message: "Album not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Album updated successfully",
            data: album,
        });
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

        res.status(200).json({
            success: true,
            message: "Album deleted successfully",
        });
    };
}