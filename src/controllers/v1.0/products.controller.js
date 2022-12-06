const db = require('../../utils/db.ultil');

module.exports = {
	getAllProducts: () => {
		return function (req, res) {
			const data = db.get("products").values();
			res.type('json');
			res.send(data);
		};
	},
};
