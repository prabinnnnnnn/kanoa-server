import "express-session";

interface SessionUser {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
}

declare module "express-session" {
    interface SessionData {
        user?: SessionUser;
        ip?: string;
        userAgent?: string;
    }
}