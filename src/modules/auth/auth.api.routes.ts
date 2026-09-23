import { Router } from "express";
import { AuthApiController } from "./auth.api.controller.js";

const authApiRouter = Router();
const authApiController = new AuthApiController();

authApiRouter.post("/login", authApiController.login);

export default authApiRouter;