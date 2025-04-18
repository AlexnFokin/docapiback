import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { client_url } from '../config/config';

class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
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

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const token = await this.authService.login(req.body);
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({
                message:
                    error instanceof Error ? error.message : 'Login failed',
            });
        }
    }

    activate = async (req: Request, res: Response): Promise<void> => {
        try {
            const activaitonLink = req.params.link
            await this.authService.activate(activaitonLink)
            return res.redirect(client_url);
        } catch (error) {
            console.log(error)
        }

    }

    public async logout(req: Request, res: Response): Promise<void> {}
    public async refresh(req: Request, res: Response): Promise<void> {}
}

export default AuthController;
