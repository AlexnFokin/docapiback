import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { client_url } from '../config/config';
import { validationResult } from 'express-validator';
import { NextFunction } from 'express-serve-static-core';
import { HttpException } from '../exceptions/http.exception';

class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
               return next(new HttpException(        
                    400,
                    'Validation failed',
                    'VALIDATION_ERROR',
                    errors.array() 
                ));
            }

            const userData = await this.authService.register(req.body);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            res.status(201).json({ userData });
        } catch (error) {
            res.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : 'Registration failed',
            });
        }
    }

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
      
            const userData = await this.authService.login(req.body);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            res.status(201).json({ userData });
        } catch (error) {
            res.status(401).json({
                message:
                    error instanceof Error ? error.message : 'Login failed',
            });
            next();
        }
    }

    activate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const activaitonLink = req.params.link
            await this.authService.activate(activaitonLink)
            return res.redirect(client_url);
        } catch (error) {
           next(error)
        }

    }

    logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {
            const {refreshToken} = req.cookies;
            const token = await this.authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.json(token);
        } catch (error) {
            next(error);
        }

    }
    refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {refreshToken} = req.cookies;

            const userData = await this.authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(userData);

        } catch (error) {
            next(error);
        }
    }

    getUsers = async (req: Request, res: Response, next: NextFunction) => {
        
        try {
            const users = await this.authService.getUsers();
            res.json(users)
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;
