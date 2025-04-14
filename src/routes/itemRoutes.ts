
import { Router } from "express";
import { ItemController } from "../controllers/item.controller";
import prisma from "../prismaClient";

const itemRouter = Router();

const itemController = new ItemController();

itemRouter.get('/', itemController.getAllItems)
// itemRouter.get('/:id', getItemById);
// itemRouter.post('/', createItem);
// itemRouter.put('/:id', updateItem);
// itemRouter.delete('/:id', deleteItem);

itemRouter.get('/pr', async (req, res, next) => {
    try {
        const tasks = await prisma.task.findMany({
            include: { author: true }  
        });
        res.json(tasks);
    } catch (error) {
        next(error);
    }
});
export default itemRouter;