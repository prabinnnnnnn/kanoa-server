import { IRepository } from "../../types/crud.types.js";
import { Artist } from "../artist/artist.model.js";
import { Album } from "../../config/associations.js";
import { AlbumCreationAttributes, AlbumUpdateAttributes } from "./album.types.js";

export class AlbumRepository implements IRepository<Album, AlbumCreationAttributes, AlbumUpdateAttributes> {

    async getAll(): Promise<Album[]> {
        return Album.findAll({
            include: {
                model: Artist,
                as: "artist",
                attributes: ["name"]
            }
        });
    }

    async create(data: AlbumCreationAttributes): Promise<Album> {
        return Album.create(data);
    }

    async update(id: string, data: AlbumUpdateAttributes): Promise<Album | null> {
        const album = await Album.findByPk(id);

        if (!album) return null;

        return album.update(data);
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await Album.destroy({
            where: { id },
        });

        return deleted > 0;
    }

    async getById(id: string): Promise<Album | null> {
        return Album.findByPk(id);
    }
}