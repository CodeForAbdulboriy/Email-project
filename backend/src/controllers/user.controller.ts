import { User } from "../models/models.js";
import { Request, Response } from "express";
import { hash, compare } from "bcrypt";
import { reqBody, resBody } from "../types/user.types.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

class UserController {
    async createUser(req: Request<{}, resBody, reqBody>, res: Response<resBody>) {
        try {
            const { password, email } = req.body;

            const findUser = await User.findOne({
                where: {
                    email: email
                }
            });

            if (findUser) {
                return res.status(400).json({
                    message: "Данная почта уже используется!"
                });
            }

            const hashedPassword = await hash(password, 10);

            await User.create({
                email: email,
                password: hashedPassword
            });

            return res.status(201).json({
                message: "Пользователь успешно добавлен!"
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({
                    message: error.message
                });
            }
        }
    }

    async login(req: Request<{}, resBody, reqBody>, res: Response<resBody>) {
        try {
            const { email, password } = req.body;

            const checkEmail = await User.findOne({
                where: {
                    email: email
                }
            });

            if (!checkEmail) {
                return res.status(400).json({
                    message: "Данной почты не существует!"
                });
            }

            const checkPassword = compare(password, checkEmail.password);

            if (!checkPassword) {
                return res.status(400).json({
                    message: "Неверный пароль!"
                });
            }

            const secretKey = process.env.SECRET_KEY;

            if (!secretKey) {
                return res.status(500).json({
                    message: "Отсутсвует секретный ключ!"
                });
            }

            const token = jwt.sign({ id: checkEmail.id }, secretKey, { expiresIn: "24h" });

            return res.status(200).json({
                message: "вы успешно верификацировались!",
                token: token
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({
                    message: error.message
                });
            }
        }
    }

    async profile(req: Request, res: Response<resBody>) {
        try {
            const user = await User.findByPk(req.user?.id);

            if (!user) {
                return res.status(401).json({
                    message: "Не удалось получить доступ к профилю!"
                });
            }

            return res.status(200).json({
                message: "Вы успешно вошли в профиль!",
                user: {
                    id: user.id,
                    email: user.email
                }
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Ошибка сервера, при получение доступа к профилю!"
            });
        }
    }

    async changeEmail(req: Request<{}, resBody, reqBody>, res: Response<resBody>) {
        try {
            const { email, password, newEmail } = req.body;

            const user = await User.findOne({
                where: {
                    email: email
                }
            });

            if (!user) {
                return res.status(400).json({
                    message: "Данный пользователь не найден!"
                });
            }

            const checkPassword = await compare(password, user.password);

            if (!checkPassword) {
                return res.status(400).json({
                    message: "Неверный пароль!"
                });
            }

            await user.update({
                email: newEmail
            });

            return res.status(200).json({
                message: "Название почты успешно изменено!"
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({
                    message: error.message
                });
            }
        }
    }

    async deleteUser(req: Request<{}, resBody, reqBody>, res: Response<resBody>) {
        try {
            const { email } = req.body;

            const user = User.findOne({
                where: {
                    email: email
                }
            });

            if(!user) {
                return res.status(400).json({
                    message: "Данный пользователь не существует!"
                });
            }

            await User.destroy({
                where: {
                    email: email
                }
            });

            return res.status(200).json({
                message: "Пользователь успешно удален!"
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({
                    message: error.message
                });
            }
        }
    }


    // Devfunc
    async get(req: Request, res: Response<resBody>) {
        const users = await User.findAll();

        const userId = await users.map((user) => {
            return user.id
        });
        const userEmai = await users.map((user) => {
            return user.email
        });

        res.status(200).json({
            message: "Пользователи:",
            user: {
                id: userId,
                email: userEmai
            }
        });
    }
}

export default new UserController;