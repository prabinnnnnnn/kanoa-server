import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/api.response.utils.js";

export const validate = (schema: z.ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const details = result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                issue: issue.message,
            }));

            return errorResponse(
                res,
                {
                    code: "VALIDATION_FAILED",
                    message: "The request contains invalid or missing data.",
                    details,
                    requestId: req.requestId,
                },
                422
            );
        }

        req.body = result.data;

        next();
    };
};