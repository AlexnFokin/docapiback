import Jwt, { JwtPayload } from 'jsonwebtoken';
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

    validateAccessToken(token: string) {
        try {
            const userData = Jwt.verify(token, jwt_access_secret);
            return userData
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = Jwt.verify(token, jwt_refresh_secret) as JwtPayload & { id: number, email: string, role: string };
        return userData;
            return userData
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    async saveToken(userId: number, refreshToken: string) {
        const tokenData = await this.tokenRepository.findByUserId(userId);

        if (tokenData) {
            tokenData.refreshToken = refreshToken;

            return await this.tokenRepository.update(userId, refreshToken);
        }

        return await this.tokenRepository.create({ userId, refreshToken });
  
    }

    async removeToken(refreshToken: string) {
        return await this.tokenRepository.removeToken(refreshToken);
    }

    async getToken(refreshToken: string) {
        return await this.tokenRepository.getToken(refreshToken)
    }
}

export { TokenService };
