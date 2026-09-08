import { Sequelize } from 'sequelize';
import env from "./env.js"

const db = new Sequelize(
    env.DB_NAME,
    env.DB_USER,
    env.DB_PASSWORD,
    {
        host: env.DB_HOST,
        port: env.DB_PORT,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 2,
            acquire: 30000,
            idle: 10000
        },
        dialectOptions: env.NODE_ENV === 'prod' ? {
            ssl: false
        } : {},
        logging: false,
    }
);


const connectDatabase = async (): Promise<void> => {
    try {
        await db.authenticate();
        console.log("Database connected successfully.");

        // Only sync automatically during development
        if (env.NODE_ENV === "dev") {
            await db.sync();
            console.log("Database synchronized.");
        }
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};

export { db, connectDatabase };