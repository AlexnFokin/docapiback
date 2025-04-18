import Jwt from 'jsonwebtoken';
import { jwt_access_secret, jwt_refresh_secret } from '../config/config';
import { TokenRepository } from '../repositories/token.repository';
import { MyJwtPayload } from '../types/jwt';

class TokenService {
    tokenRepository: TokenRepository;

    constructor() {
        this.tokenRepository = new TokenRepository();
    }

    generateTokens(payload: MyJwtPayload) {
        const accessToken = Jwt.sign(payload, jwt_access_secret, {
            expiresIn: '30m',
        });
        const refreshToken = Jwt.sign(payload, jwt_refresh_secret, {
            expiresIn: '30d',
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userId: number, refreshToken: string) {
        const tokenData = await this.tokenRepository.findByUserId(userId);

        if (tokenData) {
            tokenData.refreshToken = refreshToken;

            return await this.tokenRepository.update(userId, refreshToken);
        }

        return await this.tokenRepository.create({ userId, refreshToken });
  
    }
}

export { TokenService };
