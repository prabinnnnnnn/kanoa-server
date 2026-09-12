import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { AuthRepository } from "./auth.repository.js";

const authRouter = Router()
const authController = new AuthController(new AuthService(new AuthRepository))

authRouter.post("/register", authController.create)
authRouter.post("/login", authController.create)
authRouter.post("/logout", authController.create)

export default authRouter;