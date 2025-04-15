import { MyJwtPayload } from '../jwt';

declare global {
    namespace Express {
        interface Request {
            user?: MyJwtPayload;
        }
    }
}
