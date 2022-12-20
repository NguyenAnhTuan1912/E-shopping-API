import { getProducsBySearchString } from '../../utils/lowdb.ultil.mjs';
export const searchProducts = () => {
    return async function (req, res) {
        const searchStrings = req.query;
        const data = await getProducsBySearchString(searchStrings);
        res.type('json');
        return res.send(data);
    };
};
