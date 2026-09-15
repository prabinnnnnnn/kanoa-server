import { Request, Response } from "express";
import { AppError } from "../errors/app.error.js";

export const handleError = (req: Request, res: Response, error: unknown, redirect: string, message = "Something went wrong"): void => {
    console.error(error);

    if (error instanceof AppError) {
        req.flash("error", error.message);
    } else {
        req.flash("error", message);
    }

    res.redirect(redirect);
};