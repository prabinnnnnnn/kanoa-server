import { IRepository } from "../../types/crud.types.js";
import { Album, Artist, Song } from "../../config/associations.js";
import { SongCreationAttributes, SongUpdateAttributes } from "./song.types.js";

export class SongRepository implements IRepository<Song, SongCreationAttributes, SongUpdateAttributes> {

    async getAll(): Promise<Song[]> {
        return Song.findAll({
            include: [
                {
                    model: Album,
                    as: "album",
                    attributes: ["title"]
                },
                {
                    model: Artist,
                    as: "artist",
                    attributes: ["name"]
                }
            ]
        });
    }

    async create(data: SongCreationAttributes): Promise<SongCreationAttributes> {
        return Song.create(data);
    }

    async update(id: string, data: SongUpdateAttributes): Promise<SongUpdateAttributes | null> {
        const song = await Song.findByPk(id);

        if (!song) return null;

        return song.update(data);
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await Song.destroy({
            where: { id },
        });

        return deleted > 0;
    }

    async getById(id: string): Promise<Song | null> {
        return Song.findByPk(id);
    }
}