const jwt = require('jsonwebtoken');
const authConfig = require('./auth.config.js');

module.exports = {
  generateAccessToken: (username) => {
    return jwt.sign(username, authConfig.TOKEN_SECRET);
  },
};
