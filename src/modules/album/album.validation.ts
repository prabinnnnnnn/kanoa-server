import { z } from "zod";


export const createAlbumSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Album title is required")
        .max(255, "Album title must not exceed 255 characters"),

    slug: z
        .string()
        .trim()
        .min(1, "Album Slug is required")
        .max(255, "Album slug must not exceed 255 characters"),

    coverImage: z
        .string()
        .trim()
        .nullable()
        .optional(),

    artistId: z.uuid("Invalid artist ID"),

    releaseDate: z
        .coerce
        .date()
        .nullable()
        .optional(),
});


export const updateAlbumSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Album title is required")
        .max(255, "Album title must not exceed 255 characters")
        .optional(),

    slug: z
        .string()
        .trim()
        .min(1, "Album Slug is required")
        .max(255, "Album slug must not exceed 255 characters"),

    coverImage: z
        .string()
        .trim()
        .nullable()
        .optional(),

    artistId: z.uuid("Invalid artist ID").optional(),

    releaseDate: z
        .coerce
        .date()
        .nullable()
        .optional(),
});


export const deleteAlbumSchema = z.object({
    id: z.uuid("Invalid album ID"),
});