import { PrismaClient, User } from '@prisma/client';
import { UserCreateDTO } from '../types/user';

class UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    public async create(data: UserCreateDTO) {
        return this.prisma.user.create({ data });
    }

    public async findByActivationLink(activationLink: string) {
        return this.prisma.user.findUnique({where: { activationLink }})
    }

    public async update(id: number, data: Partial<User>) {
        return this.prisma.user.update({
            where: {id},
            data: data
        })
    }

    public async findById(id: number) {
        return this.prisma.user.findUnique({where: {id}})
    }

    public async getAll() {
        return this.prisma.user.findMany();
    }
}

export default UserRepository;
