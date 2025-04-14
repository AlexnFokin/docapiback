import { Item } from "../interfaces/item.interface";

class ItemRepository {

    async findAll(): Promise<Item[]> {

        const items: Item[] = [
            { id: '1', name: 'Example 1', description: 'First example' },
            { id: '2', name: 'Example 2', description: 'Second example' },
          ];
          

        return items;
    }
}

export {ItemRepository}