import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.utils.js";

export const apiMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            res.status(401).json({
                message: "Authorization header is required",
            });
            return;
        }

        const [scheme, token] =
            authorization.split(" ");

        if (scheme !== "Bearer" || !token) {
            res.status(401).json({
                message: "Invalid authorization header",
            });
            return;
        }

        const payload = verifyAccessToken(token);

        req.user = {
            id: payload.sub,
            role: payload.role,
        };

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({
            message: "Unauthorized",
        });
    }
};