import { TaskService } from "../services/task.service";
import { Request, Response } from 'express';

class TaskController {
    taskService: TaskService;

    constructor() {
        this.taskService = new TaskService;
    }
    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
          
            const tasks = await this.taskService.getAll();
            res.status(200).json({ tasks });
        } catch(error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Tasks not found' });
        }
    }

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
            res.status(400).json({ message: error instanceof Error ? error.message : 'Error fetching task' });
        }
    };

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const { title, content, authorId } = req.body;
            if (!title || !authorId) {
                res.status(400).json({ message: 'Title and Author ID are required' });
                return;
            }

            const newTask = await this.taskService.create({ title, content, authorId });
            res.status(201).json({ task: newTask });
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Error creating task' });
        }
    };

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const { title, content, completed } = req.body;

            if (isNaN(id)) {
                res.status(400).json({ message: 'Invalid ID' });
                return;
            }

            const updatedTask = await this.taskService.update(id, { title, content, completed });
            res.status(200).json({ task: updatedTask });
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Error updating task' });
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ message: 'Invalid ID' });
                return;
            }

            await this.taskService.delete(id);
            res.status(204).send(); // No Content
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Error deleting task' });
        }
    };
}

export {TaskController};