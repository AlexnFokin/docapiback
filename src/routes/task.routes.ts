import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const taskRouter = Router();

const taskController = new TaskController;

taskRouter.get('/tasks', taskController.getAll);
taskRouter.get('/tasks/:id', taskController.getOneById);
taskRouter.post('/tasks', taskController.create);
taskRouter.patch('/tasks/:id', taskController.update);
taskRouter.delete('/tasks/:id', taskController.delete);

export {taskRouter};