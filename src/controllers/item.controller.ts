import { NextFunction, Request, Response } from 'express';
import { ItemService } from '../services/item.service';
import { NotFoundException } from '../exceptions/http.exception';

class ItemController {
  private itemService: ItemService

  constructor() {
    this.itemService = new ItemService();
  }

  getAllItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const items = await this.itemService.findAll();
      if (!items) {
        throw new NotFoundException('Items not found');
      }
      res.json(items);
    } catch (err) {
      next(err); 
    }
  };
}

export {ItemController}