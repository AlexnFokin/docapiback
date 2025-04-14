import { Router } from "express";
import AuthController from "../controllers/auth.controller";
// import { authMiddleware } from "../middlewares/auth.middleware";


const authRouter = Router();

const authController = new AuthController();

authRouter.post('/auth/register', authController.register);
authRouter.post('/auth/login', authController.login);
// authRouter.get('/auth/profile', authMiddleware, authController.profile);

export default authRouter;