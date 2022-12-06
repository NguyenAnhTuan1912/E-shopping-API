const jwt = require('jsonwebtoken');
const authMethods = require('./auth.methods.js');
module.exports = {
  login: () => function (req, res) {},
  register: () =>
    function (req, res) {
      const username = req.query['username'];
      res.type('json');
      res.send(`Register done! Hello ${username}`);
    },
};
