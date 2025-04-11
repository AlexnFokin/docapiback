
import { Router } from "express";
import { getItems, getItemById, createItem, updateItem, deleteItem } from "../controllers/itemController";

const itemRouter = Router();

itemRouter.get('/', getItems)
itemRouter.get('/:id', getItemById);
itemRouter.post('/', createItem);
itemRouter.put('/:id', updateItem);
itemRouter.delete('/:id', deleteItem);

export default itemRouter;