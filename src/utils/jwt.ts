import jwt from 'jsonwebtoken';
import { jwt_secret } from '../config/config';

const JWT_SECRET = jwt_secret;

interface Payload {
    id: number;
    email: string;
}

export const generateToken = (payload: Payload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyToken = (token: string): any => {
    return jwt.verify(token, JWT_SECRET);
};
