import { Request, Response } from "express";
import { AppError } from "../errors/app.error.js";

export const handleError = (req: Request, res: Response, error: unknown, redirect: string, message = "Something went wrong"): void => {

    if (error instanceof AppError) {
        req.flash("error", error.message);
    } else {
        req.flash("error", message);
    }

    res.redirect(redirect);
};


export const ApiHandleError = (
    req: Request,
    res: Response,
    error: unknown
): void => {
    console.error(error);

    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
        return;
    }

    res.status(500).json({
        success: false,
        message: "Something went wrong",
    });
};