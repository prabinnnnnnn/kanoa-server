import env from "./env.js";

export const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === "prod",
    sameSite: "lax" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
    // path: "/auth",
};