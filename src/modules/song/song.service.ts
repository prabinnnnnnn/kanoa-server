import { Song } from "./song.model.js";
import { SongRepository } from "./song.repository.js";
import { SongAttributes, SongCreationAttributes, SongUpdateAttributes } from "./song.types.js";

export class SongService {
    constructor(private readonly repository: SongRepository) { }

    async getAll(): Promise<Song[]> {
        return this.repository.getAll();
    }

    async getById(id: string): Promise<Song | null> {
        return this.repository.getById(id);
    }

    async create(data: SongCreationAttributes): Promise<SongCreationAttributes> {
        return this.repository.create(data);
    }

    async update(id: string, data: SongUpdateAttributes): Promise<SongUpdateAttributes | null> {
        return this.repository.update(id, data);
    }

    async delete(id: string): Promise<boolean> {
        return this.repository.delete(id);
    }
}