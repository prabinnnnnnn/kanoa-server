import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import env from "../config/env.js";

export interface AccessTokenPayload {
    sub: string;
    role: string;
}

export interface RefreshTokenPayload {
    sub: string;
    sid: string;
    type: "refresh";
}

export const generateAccessToken = (payload: AccessTokenPayload): string => {
    const options: SignOptions = {
        expiresIn: env.JWT_ACCESS_EXPIRES_IN,
    };

    return jwt.sign(payload, env.JWT_ACCESS_SECRET, options);
};

export const generateRefreshToken = (payload: RefreshTokenPayload): string => {
    const options: SignOptions = {
        expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    };

    return jwt.sign(payload, env.JWT_REFRESH_SECRET, options);
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);

    if (
        typeof decoded !== "object" ||
        decoded === null ||
        typeof decoded.sub !== "string" ||
        typeof decoded.role !== "string"
    ) {
        throw new Error("Invalid access token");
    }

    return {
        sub: decoded.sub,
        role: decoded.role,
    };
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET);

    if (
        typeof decoded !== "object" ||
        decoded === null ||
        typeof decoded.sub !== "string" ||
        typeof decoded.sid !== "string" ||
        decoded.type !== "refresh"
    ) {
        throw new Error("Invalid refresh token");
    }

    return {
        sub: decoded.sub,
        sid: decoded.sid,
        type: "refresh",
    };
};