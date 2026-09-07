import { Album } from "./album.model.js";
import { AlbumRepository } from "./album.repository.js";
import {
    AlbumCreationAttributes,
    AlbumUpdateAttributes,
} from "./album.types.js";

export class AlbumService {
    constructor(private readonly repository: AlbumRepository) { }

    async getAll(): Promise<Album[]> {
        return this.repository.getAll();
    }

    async getById(id: string): Promise<Album | null> {
        return this.repository.getById(id);
    }

    async create(data: AlbumCreationAttributes): Promise<Album> {
        return this.repository.create(data);
    }

    async update(
        id: string,
        data: AlbumUpdateAttributes
    ): Promise<Album | null> {
        return this.repository.update(id, data);
    }

    async delete(id: string): Promise<boolean> {
        return this.repository.delete(id);
    }
}