import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { AuthRepository } from "./auth.repository.js";
import { EmailService } from "../../services/email.service.js";

const authRouter = Router()
const authController = new AuthController(new AuthService(new AuthRepository, new EmailService))

authRouter.get("/verify-email/:token", authController.verifyEmail);
authRouter.post("/register", authController.register)
authRouter.post("/login", authController.login)
authRouter.post("/logout", authController.logout)
authRouter.post("/users/change-password", authController.changePassword)
authRouter.post("/users/:id", authController.delete)
authRouter.post("/refresh", authController.refresh)

export default authRouter;