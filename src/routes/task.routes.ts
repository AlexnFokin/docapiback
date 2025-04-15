import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const taskRouter = Router();
const taskController = new TaskController;

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API for managing tasks
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve a list of all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       completed:
 *                         type: boolean
 */
taskRouter.get('/tasks', taskController.getAll);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retrieve a task by its ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task was successfully retrieved
 *       404:
 *         description: Task not found
 */
taskRouter.get('/tasks/:id', taskController.getOneById);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task successfully created
 *       400:
 *         description: Invalid input data
 */
taskRouter.post('/tasks', taskController.create);

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update an existing task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task successfully updated
 *       400:
 *         description: Invalid ID or input
 *       404:
 *         description: Task not found
 */
taskRouter.patch('/tasks/:id', taskController.update);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to delete
 *     responses:
 *       204:
 *         description: Task successfully deleted
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Task not found
 */
taskRouter.delete('/tasks/:id', taskController.delete);

export { taskRouter };
