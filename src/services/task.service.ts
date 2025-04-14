import { Task } from "@prisma/client";
import { TaskRepository } from "../repositories/task.repository";

class TaskService {
    taskRepository: TaskRepository;

    constructor() {
        this.taskRepository = new TaskRepository;
    }

    async getAll() {
        return this.taskRepository.getAll();
    }

    async getOneById(id: number): Promise<Task | null> {
        return this.taskRepository.getOneById(id);
    }

    async create(data: { title: string; content?: string; authorId: number }): Promise<Task> {
        return this.taskRepository.create(data);
    }

    async update(id: number, data: Partial<{ title: string; content?: string; completed?: boolean }>): Promise<Task> {
        return this.taskRepository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        return this.taskRepository.delete(id);
    }
}
export {TaskService};