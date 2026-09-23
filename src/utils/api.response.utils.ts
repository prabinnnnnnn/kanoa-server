import { Response } from "express";

interface ErrorDetail {
    field?: string;
    issue: string;
}

interface ErrorResponseOptions {
    code: string;
    message: string;
    details?: ErrorDetail[];
    requestId?: string;
}

// Success
export const successResponse = <T>(
    res: Response,
    data: T,
    message = "Data retrieved successfully",
    statusCode = 200
) => {
    return res.status(statusCode).json({
        success: true,
        statusCode,
        message,
        data,
    });
};

// Not Found
export const notFoundResponse = (
    res: Response,
    message = "Resource not found",
    requestId?: string
) => {
    return errorResponse(
        res,
        {
            code: "NOT_FOUND",
            message,
            requestId,
        },
        404
    );
};

// Error
export const errorResponse = (
    res: Response,
    {
        code,
        message,
        details = [],
        requestId,
    }: ErrorResponseOptions,
    statusCode = 500
) => {
    return res.status(statusCode).json({
        success: false,
        statusCode,
        error: {
            code,
            message,
            details,
        },
        meta: {
            timestamp: new Date().toISOString(),
            path: res.req.originalUrl,
            requestId,
        },
    });
};