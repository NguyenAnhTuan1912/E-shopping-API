import { Request, Response } from 'express';
import { getProducsBySearchString } from '../../utils/lowdb.ultil.mjs';

type ProductSearchQueryModel = {
    name: string;
    category: string;
}

export const searchProducts = () => {
    return async function(req: Request, res: Response) {
        const searchStrings = req.query as ProductSearchQueryModel;
        const data = await getProducsBySearchString(searchStrings);
        res.type('json');
        return res.send(data);
    }
}