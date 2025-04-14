import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

interface Payload {
  id: number;
  email: string;
}

export const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
