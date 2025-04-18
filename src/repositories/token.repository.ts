import { PrismaClient } from '@prisma/client';

class TokenRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async findByUserId(userId: number) {
        return this.prisma.token.findUnique({ where: { userId } });
    }

    public async create(data: { userId: number; refreshToken: string }) {
        return this.prisma.token.create({ data });
    }

    public async update(userId: number, refreshToken: string) {
        return await this.prisma.token.update({
            where: { userId },
            data: { refreshToken },
        });
    }

    public async removeToken(refreshToken: string) {
        return await this.prisma.token.delete({where: {'refreshToken': refreshToken}})
    }

    public async getToken(refreshToken: string) {
        return await this.prisma.token.findUnique({where: {refreshToken}})
    }
}

export { TokenRepository };
