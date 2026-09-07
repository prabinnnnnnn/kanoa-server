export interface SongAttributes {
    id: string;
    title: string;
    duration: number | null;
    audioUrl: string;
    coverImage: string | null;
    albumId: string;
    artistId: string;
}

export interface SongCreationAttributes {
    title: string;
    duration?: number | null;
    audioUrl: string;
    coverImage?: string | null;
    albumId: string;
    artistId: string;
}