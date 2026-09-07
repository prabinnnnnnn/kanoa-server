import { Artist } from "./artist.model.js";
import { ArtistRepository } from "./artist.repository.js";
import { ArtistCreationAttributes, ArtistUpdateAttributes } from "./artist.types.js";

export class ArtistService {
    constructor(private readonly repository: ArtistRepository) { }

    async getAll(): Promise<Artist[]> {
        return this.repository.getAll();
    }

    async getById(id: string): Promise<Artist | null> {
        return this.repository.getById(id);
    }

    async create(data: ArtistCreationAttributes): Promise<Artist> {
        return this.repository.create(data);
    }

    async update(
        id: string,
        data: ArtistUpdateAttributes
    ): Promise<Artist | null> {
        return this.repository.update(id, data);
    }

    async delete(id: string): Promise<boolean> {
        return this.repository.delete(id);
    }
}