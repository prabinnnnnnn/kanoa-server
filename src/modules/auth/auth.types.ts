import { User } from "./auth.model.js";

export enum UserRoleENUM {
    user = "user",
    artist = "artist",
    admin = "admin",
}
export interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;

    role: UserRoleENUM;
    isActive: boolean;
    isEmailVerified: boolean;
    emailVerificationToken: string | null;
    emailVerificationExpires: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCreationAttributes {
    name: string;
    email: string;
    password: string;
    role: UserRoleENUM;
    emailVerificationToken: string | null;
    emailVerificationExpires: Date | null;
}

export interface UserUpdateAttributes {
    name: string;
    email: string;
    password: string;
    role: UserRoleENUM;
    isActive: boolean;
    isEmailVerified: boolean;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface LoginResult {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface RefreshResult {
    accessToken: string;
    refreshToken: string;
}