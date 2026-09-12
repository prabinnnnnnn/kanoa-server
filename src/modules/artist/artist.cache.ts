export const artistCacheKeys = {
    all: () => "artists:all",

    byId: (id: string) => `artist:id:${id}`,

    bySlug: (slug: string) => `artist:slug:${slug}`,
};