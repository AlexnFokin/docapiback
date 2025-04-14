import { Request, Response } from 'express';
import AuthService from '../services/auth.service';


class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const token = await this.authService.register(req.body);
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Registration failed' });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const token = await this.authService.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: error instanceof Error ? error.message : 'Login failed' });
    }
  }
}

export default AuthController;
