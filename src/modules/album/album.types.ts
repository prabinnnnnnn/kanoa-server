export interface AlbumAttributes {
    id: string;
    title: string;
    slug: string;
    coverImage: string | null;
    artistId: string;
    releaseDate: Date | null;
}

export interface AlbumCreationAttributes {
    id: string;
    title: string;
    slug: string;
    artistId: string;
    coverImage?: string | null;
    releaseDate?: Date | null;
}

export interface AlbumUpdateAttributes {
    artistId?: string;
    title?: string;
    slug: string;
    coverImage?: string | null;
    releaseDate?: Date | null;
}