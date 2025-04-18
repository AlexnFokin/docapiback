import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import '../swagger/auth.routes';
import {body} from 'express-validator';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/auth/register', 
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    authController.register
);

authRouter.post('/auth/login', authController.login);
authRouter.post('/auth/logout', authController.logout);
authRouter.get('/auth/activate/:link', authController.activate);
authRouter.get('/auth/refresh', authController.refresh);

export default authRouter;
