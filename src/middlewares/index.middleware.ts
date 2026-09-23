import { Express } from "express"
import express from "express";
import cors from "cors";
import flash from "connect-flash";
import expressLayouts from "express-ejs-layouts";

import { corsOptions } from "../config/cors.js";
import { sessionMiddleware } from "../config/session.js";
import { staticMiddleware } from "./static.middleware.js";
import cookieParser from "cookie-parser";

import env from "../config/env.js";
import { requestId } from "../config/request.ID.js";

export const registerMiddlewares = (app: Express) => {
    // Body parser
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(requestId)

    // Session
    app.use(sessionMiddleware);

    // Flash messages
    app.use(flash());

    // CORS
    if (env.NODE_ENV === "dev") {
        app.use(cors());
    } else {
        app.use(cors(corsOptions));
    }

    // Static files
    staticMiddleware(app);

    // EJS
    app.use(expressLayouts);
    app.set("layout", "layouts/layout");
    app.set("view engine", "ejs");
};