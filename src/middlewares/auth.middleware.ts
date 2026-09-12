import {
    NextFunction,
    Request,
    Response,
} from "express";

const PUBLIC_URLS = [
    "/auth/login",
    "/auth/register",
];

const PUBLIC_PATHS = [
    "/css",
    "/js",
    "/images",
    "/favicon.ico",
];

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    /*
     * 1. Allow public URLs
     */
    if (
        PUBLIC_URLS.includes(req.path) ||
        PUBLIC_PATHS.some((path) => req.path.startsWith(path))
    ) {
        next();
        return;
    }

    /*
     * 2. Get logged-in user from session
     */
    const user = req.session.user;

    /*
     * 3. User is not logged in
     */
    if (!user) {
        req.flash(
            "error",
            "Please login to continue",
        );

        res.redirect("/auth/login");
        return;
    }

    /*
     * 4. Check IP address
     */
    if (
        req.session.ip &&
        req.session.ip !== req.ip
    ) {
        req.flash(
            "error",
            "Suspicious activity detected, please login again.",
        );

        req.session.destroy(() => {
            res.redirect("/auth/login");
        });

        return;
    }

    /*
     * 5. Check User-Agent
     */
    if (
        req.session.userAgent &&
        req.session.userAgent !== req.headers["user-agent"]
    ) {
        req.flash(
            "error",
            "Suspicious activity detected, please login again.",
        );

        req.session.destroy(() => {
            res.redirect("/auth/login");
        });

        return;
    }

    /*
     * 6. Make user available inside EJS
     */
    res.locals.user = user;

    /*
     * 7. Continue to requested route
     */
    next();
};