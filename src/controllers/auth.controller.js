const jwt = require('jsonwebtoken');

module.exports = {
  login: () => function (req, res) {},
  register: () =>
    function (req, res) {
      const username = req.query['username'];
      res.type('json');
      res.send(`Register done! Hello ${username}`);
    },
};
