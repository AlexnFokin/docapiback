
import { Router } from "express";
import { ItemController } from "../controllers/item.controller";

const itemRouter = Router();

const itemController = new ItemController();

itemRouter.get('/', itemController.getAllItems)
// itemRouter.get('/:id', getItemById);
// itemRouter.post('/', createItem);
// itemRouter.put('/:id', updateItem);
// itemRouter.delete('/:id', deleteItem);

export default itemRouter;