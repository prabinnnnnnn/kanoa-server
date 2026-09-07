export interface ArtistAttributes {
    id: string;
    name: string;
    slug: string;
    bio?: string;
    image: string;
    coverImage: string;
    genre: string | null;
    content: string;
}

export interface ArtistCreationAttributes {
    // id: string;
    name: string;
    slug: string;
    bio: string;
    image: string;
    genre: string | null;
    coverImage: string;
    content: string;
}

export interface ArtistUpdateAttributes {
    name: string;
    slug: string;
    bio: string;
    image: string;
    genre: string | null;
    coverImage: string;
    content: string;
}