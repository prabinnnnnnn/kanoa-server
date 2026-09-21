export interface SongAttributes {
    id: string;
    title: string;
    slug: string;
    duration: number | null;
    audioUrl: string;
    image: string | null;
    coverImage: string | null;
    isPopular: boolean;
    isTrending: boolean;
    content: string;
    albumId: string;
    artistId: string;
}

export interface SongCreationAttributes {
    title: string;
    slug: string;
    duration?: number | null;
    audioUrl: string;
    image: string | null;
    coverImage?: string | null;
    isPopular: boolean;
    isTrending: boolean;
    content: string;
    albumId: string;
    artistId: string;
}

export interface SongUpdateAttributes {
    title: string;
    slug: string;
    duration?: number | null;
    audioUrl: string;
    image: string | null;
    coverImage?: string | null;
    isPopular: boolean;
    isTrending: boolean;
    content: string;
    albumId: string;
    artistId: string;
}