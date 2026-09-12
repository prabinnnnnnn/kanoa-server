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

    createdAt: Date;
    updatedAt: Date;
}

export interface UserCreationAttributes {
    name: string;
    email: string;
    password: string;
    role: UserRoleENUM;
}

export interface UserUpdateAttributes {
    name: string;
    email: string;
    password: string;
    role: UserRoleENUM;
    isActive: boolean;
    isEmailVerified: boolean;
}