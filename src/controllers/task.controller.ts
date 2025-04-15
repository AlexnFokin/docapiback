import { Request, Response } from 'express';
import { MyJwtPayload } from '../types/jwt';
import { TaskService } from '../services/task.service';

interface AuthRequest extends Request {
    user?: MyJwtPayload;
}

class TaskController {
    taskService: TaskService;

    constructor() {
        this.taskService = new TaskService();
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const tasks = await this.taskService.getAll();
            res.status(200).json({ tasks });
        } catch (error) {
            res.status(400).json({
                message:
                    error instanceof Error ? error.message : 'Tasks not found',
            });
        }
    };

    getOneById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ message: 'Invalid ID' });
                return;
            }

            const task = await this.taskService.getOneById(id);
            if (!task) {
                res.status(404).json({ message: 'Task not found' });
                return;
            }

            res.status(200).json({ task });
        } catch (error) {
            res.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : 'Error fetching task',
            });
        }
    };

    create = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const { title, content } = req.body;

            if (!title) {
                res.status(400).json({ message: 'Title is required' });
                return;
            }

            if (!req.user?.id) {
                res.status(403).json({
                    message: 'Unauthorized: user ID not found',
                });
                return;
            }

            const newTask = await this.taskService.create({
                title,
                content,
                authorId: req.user.id,
            });

            res.status(201).json({ task: newTask });
        } catch (error) {
            res.status(500).json({
                message:
                    error instanceof Error
                        ? error.message
                        : 'Internal Server Error',
            });
        }
    };

    update = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const { title, content, completed } = req.body;

            if (isNaN(id)) {
                res.status(400).json({ message: 'Invalid ID' });
                return;
            }

            if (!req.user?.id) {
                res.status(403).json({
                    message: 'Unauthorized: user ID not found',
                });
                return;
            }

            const task = await this.taskService.getOneById(id);
            if (!task) {
                res.status(404).json({ message: 'Task not found' });
                return;
            }

            if (task.authorId !== req.user.id) {
                res.status(403).json({
                    message: 'Forbidden: You cannot update this task',
                });
                return;
            }

            const updatedTask = await this.taskService.update(id, {
                title,
                content,
                completed,
            });
            res.status(200).json({ task: updatedTask });
        } catch (error) {
            res.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : 'Error updating task',
            });
        }
    };

    delete = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ message: 'Invalid ID' });
                return;
            }

            if (!req.user?.id) {
                res.status(403).json({
                    message: 'Unauthorized: user ID not found',
                });
                return;
            }

            const task = await this.taskService.getOneById(id);
            if (!task) {
                res.status(404).json({ message: 'Task not found' });
                return;
            }

            if (task.authorId !== req.user.id) {
                res.status(403).json({
                    message: 'Forbidden: You cannot delete this task',
                });
                return;
            }

            await this.taskService.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : 'Error deleting task',
            });
        }
    };
}

export { TaskController };
