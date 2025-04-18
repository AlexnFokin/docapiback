import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
// import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = Router();
const authController = new AuthController();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and registration
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Validation error
 */
authRouter.post('/auth/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
authRouter.post('/auth/login', authController.login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *       401:
 *         description: Unauthorized, invalid or missis
 */

/**
 * @swagger
 * /auth/logout:
 * post:
 *  summary: Post for logout
 *  tags: [Authentication]
 *  security:
 *   - bearerAuth: []
 *  responses:
 *       200:
 *         description: Successfully logout
 *       401:
 *         description: Bad
 */
authRouter.post('/auth/logout', authController.logout);

/**
 * @swagger
 * /auth/activate:
 * get:
 *  summary: Get for activation
 *  tags: [Authentication]
 *  security:
 *   - bearerAuth: []
 *  responses:
 *       200:
 *         description: Successfully logout
 *       401:
 *         description: Bad
 */
authRouter.get('/auth/activate/:link', authController.activate);

/**
 * @swagger
 * /auth/refresh:
 * get:
 *  summary: refresh token
 *  tags: [Authentication]
 *  security:
 *   - bearerAuth: []
 *  responses:
 *       200:
 *         description: Successfully logout
 *       401:
 *         description: Bad
 */
authRouter.get('/auth/refresh', authController.refresh);

export default authRouter;
