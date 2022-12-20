import { getRecords } from '../../utils/lowdb.ultil.mjs';
import { NotFound } from '@curveball/http-errors';
export const getAllProducts = () => {
    return async function (req, res) {
        try {
            const data = await getRecords("products");
            if (data === undefined)
                throw new NotFound("Products not found");
            res.type('json');
            return res.send(data);
        }
        catch (error) {
            const httpStatus = error.httpStatus | 500;
            res.type('json');
            res.status(httpStatus);
            return res.send(error);
        }
    };
};
