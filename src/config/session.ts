import session from "express-session";
import SQLite3SessionStore from "connect-sqlite3";
import env from "./env.js";

const SqliteStore = SQLite3SessionStore(session);

export const sessionMiddleware = session({
    secret: env.APP_SECRET,
    store: new SqliteStore({
        db: "sessions.db",
        dir: "./",
    }) as session.Store,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true,
        sameSite: "strict",
    },
});