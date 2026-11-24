import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT
} = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
    throw new Error("Не все переменные окружения указаны в .env");
}

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: "postgres",
    host: DB_HOST,
    port: Number(DB_PORT)
});

export default db;