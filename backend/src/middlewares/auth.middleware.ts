import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import { authPayload } from "../types/auth.types.js";
import { config } from "dotenv";

config();

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth = req.headers.authorization;

        if (!auth || !auth.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Токен отсутствует!"
            });
        }

        const token = auth.split(" ")[1];
        
        const secretKey = process.env.SECRET_KEY;

        if (!secretKey) {
            return res.status(500).json({
                message: "Отсутсвует секретный ключ!"
            });
        }

        const tokenDecoded = jwt.verify(
            token,
            secretKey
        ) as authPayload;

        req.user = {
            id: tokenDecoded.id
        };

        next();
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(401).json({
                message: "Ошибка обработки токена!"
            });
        }
    }
}

export default authMiddleware