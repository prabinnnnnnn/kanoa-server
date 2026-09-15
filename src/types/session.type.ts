import "express-session";
import { UserRoleENUM } from "../modules/auth/auth.types.js";

interface SessionUser {
    id: string;
    name: string;
    email: string;
    role: UserRoleENUM;
}

declare module "express-session" {
    interface SessionData {
        user?: SessionUser;
        ip?: string;
        userAgent?: string;
    }
}