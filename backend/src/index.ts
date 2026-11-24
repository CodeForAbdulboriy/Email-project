import express from "express";
import { config } from "dotenv";
import db from "./db.js";
import userRouter from "./routers/user.router.js";

config();

const app = express();

const PORT: number = Number(process.env.PORT);

const start = async () => {
    await db.authenticate();
    await db.sync();

    app.use(express.json());

    app.use("/user", userRouter);
    
    app.listen(PORT, () => {
        console.log("Программа запущена!");
    });
}

start();