import redis from "../../config/redis.js";
import { artistCacheKeys } from "./artist.cache.js";
import { Artist } from "./artist.model.js";
import { ArtistRepository } from "./artist.repository.js";
import { ArtistCreationAttributes, ArtistUpdateAttributes } from "./artist.types.js";

export class ArtistService {
    constructor(private readonly repository: ArtistRepository) { }

    async getAll(): Promise<Artist[]> {
        const cached = await redis.get(artistCacheKeys.all());

        if (cached) {
            return JSON.parse(cached);
        }

        const artists = await this.repository.getAll();
        await redis.set(
            artistCacheKeys.all(),
            JSON.stringify(artists),
            { EX: 60 * 10 }
        );

        return artists;
    }

    async getById(id: string): Promise<Artist | null> {
        const cached = await redis.get(artistCacheKeys.byId(id));

        if (cached) {
            return JSON.parse(cached);
        }

        const artist = await this.repository.getById(id);

        if (!artist) return null;

        await redis.set(
            artistCacheKeys.bySlug(id),
            JSON.stringify(artist),
            {
                EX: 60 * 10,
            }
        );

        return artist;
    }

    async getBySlug(slug: string): Promise<Artist | null> {

        const cached = await redis.get(artistCacheKeys.bySlug(slug));

        if (cached) {
            return JSON.parse(cached);
        }
        const artist = await this.repository.getBySlug(slug);

        if (!artist) return null;

        await redis.set(
            artistCacheKeys.bySlug(slug),
            JSON.stringify(artist),
            {
                EX: 60 * 10,
            }
        );

        return artist;
    }

    async create(data: ArtistCreationAttributes): Promise<Artist> {
        const artist = this.repository.create(data);
        await redis.del("artists:all");
        return artist
    }

    async update(id: string, data: ArtistUpdateAttributes): Promise<Artist | null> {
        const artist = await this.repository.getById(id);

        if (!artist) {
            throw new Error("Artist not found");
        }

        const oldSlug = artist.slug;

        const updatedArtist = await this.repository.update(id, data);

        if (!updatedArtist) {
            throw new Error("Failed to update artist");
        }

        await redis.del(artistCacheKeys.all());

        await redis.del(artistCacheKeys.bySlug(oldSlug));

        if (updatedArtist.slug !== oldSlug) {
            await redis.del(artistCacheKeys.bySlug(updatedArtist.slug));
        }

        return updatedArtist;
    }

    async delete(id: string): Promise<boolean> {
        const artist = await this.repository.getById(id);

        if (!artist) {
            throw new Error("Artist not found");
        }

        const deleted = await this.repository.delete(id);

        if (!deleted) {
            throw new Error("Failed to delete artist");
        }

        await Promise.all([
            redis.del(artistCacheKeys.all()),
            redis.del(artistCacheKeys.bySlug(artist.slug)),
            redis.del(artistCacheKeys.byId(artist.id))
        ])

        return deleted
    }
}