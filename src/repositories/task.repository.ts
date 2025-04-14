import { PrismaClient, Task } from "@prisma/client"

class TaskRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient
    }

    async getAll() {
        return this.prisma.task.findMany();
    }

    async getOneById(id: number): Promise<Task | null> {
        return this.prisma.task.findUnique({
            where: { id }
        });
    }

    async create(data: { title: string; content?: string; authorId: number }): Promise<Task> {
        return this.prisma.task.create({
            data: {
                title: data.title,
                content: data.content,
                authorId: data.authorId
            }
        });
    }

    async update(id: number, data: Partial<{ title: string; content?: string; completed?: boolean }>): Promise<Task> {
        return this.prisma.task.update({
            where: { id },
            data
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.task.delete({
            where: { id }
        });
    }
}

export {TaskRepository}