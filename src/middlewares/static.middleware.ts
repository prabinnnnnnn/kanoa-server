import { Express } from "express";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import env from "../config/env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const staticMiddleware = (app: Express) => {
    if (env.NODE_ENV === "dev") {
        app.use(express.static(path.join(__dirname, "../../public")));
        app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));
        app.set("views", path.join(__dirname, "../views"));
    } else {
        app.use(express.static(path.join(__dirname, "../../../public")));
        app.use("/uploads", express.static(path.join(__dirname, "../../../uploads")));
        app.set("views", path.join(__dirname, "../../views"));
    }
};