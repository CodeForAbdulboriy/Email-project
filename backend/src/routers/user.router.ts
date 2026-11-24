import { Router } from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create-user", userController.createUser);
router.post("/login-user", userController.login);
router.get("/get-profile", authMiddleware, userController.profile);
router.patch("/change-email", userController.changeEmail);
router.delete("/delete-user", userController.deleteUser);

//Devrouter
router.get("/get", userController.get);

export default router;