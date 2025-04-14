
import { ItemRepository } from "../repositories/item.repository";
import { Item } from "../interfaces/item.interface";

class ItemService {
    itemRepository: ItemRepository;

    constructor() {
        this.itemRepository = new ItemRepository;
    }

    async findAll(): Promise<Item[]> {
        return this.itemRepository.findAll();
      }
}

export {ItemService}