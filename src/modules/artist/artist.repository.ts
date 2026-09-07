import { IRepository } from "../../types/crud.types.js";
import { Artist } from "./artist.model.js";
import { ArtistCreationAttributes, ArtistUpdateAttributes } from "./artist.types.js";

export class ArtistRepository implements IRepository<Artist, ArtistCreationAttributes, ArtistUpdateAttributes> {

    async getAll(): Promise<Artist[]> {
        return Artist.findAll();
    }

    async create(data: ArtistCreationAttributes): Promise<Artist> {
        return Artist.create(data);
    }

    async update(id: string, data: ArtistUpdateAttributes): Promise<Artist | null> {
        const album = await Artist.findByPk(id);

        if (!album) return null;

        return album.update(data);
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await Artist.destroy({
            where: { id },
        });

        return deleted > 0;
    }

    async getById(id: string): Promise<Artist | null> {
        return Artist.findByPk(id);
    }
}