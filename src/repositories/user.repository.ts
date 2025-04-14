import { PrismaClient } from "@prisma/client";
import { UserCreateDTO } from "../types/user";

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
}

export default UserRepository;
