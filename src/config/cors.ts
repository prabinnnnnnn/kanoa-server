import { CorsOptions } from "cors";
import env from "./env.js";

const allowedOrigins = [
    env.CLIENT_URL,
    env.SERVER_URL,
].filter((origin): origin is string => Boolean(origin));

export const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        // Allow requests without an Origin header
        // (Postman, curl, server-to-server requests, etc.)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
};
