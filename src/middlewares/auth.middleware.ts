import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { MyJwtPayload } from '../types/jwt';

interface AuthRequest extends Request {
    user?: MyJwtPayload;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                message: 'Authorization header missing or invalid',
            });
            return;
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({ message: 'Token missing' });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as MyJwtPayload;

        if (!decoded || typeof decoded !== 'object' || !decoded.id) {
            res.status(401).json({ message: 'Invalid token payload' });
            return;
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Invalid or expired token',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
