import dotenv from "dotenv";
dotenv.config();

type ENV = {
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: number;
    NODE_ENV: "dev" | "test" | "prod";
    APP_SECRET: string,
    CLIENT_URL: string,
    SERVER_URL: string,

    PORT: number,
    HOST: string,

    REDIS_URL: string;

    MAIL_HOST: string
    MAIL_PORT: number
    MAIL_USER: string
    MAIL_PASSWORD: string
    MAIL_FROM: string
};

const env: ENV = {
    // Database configuration
    DB_NAME: process.env.DB_NAME || "kit",
    DB_USER: process.env.DB_USER || "kit",
    DB_PASSWORD: process.env.DB_PASSWORD || "Password@123",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: Number(process.env.DB_PORT) || 8000,

    // app configuration
    NODE_ENV: (process.env.NODE_ENV as ENV["NODE_ENV"]) || "dev",
    APP_SECRET: process.env.APP_SECRET || "abrakadabra",
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
    SERVER_URL: process.env.SERVER_URL || "http://localhost:8000",
    HOST: process.env.HOST || "localhost",
    PORT: Number(process.env.PORT) || 8000,

    // Redis
    REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",

    MAIL_HOST: process.env.MAIL_HOST || 'some',
    MAIL_PORT: Number(process.env.MAIL_PORT) || 57,
    MAIL_USER: process.env.MAIL_USER || "",
    MAIL_PASSWORD: process.env.MAIL_PASSWORD || '',
    MAIL_FROM: process.env.MAIL_FROM || '',
};

export default env;
