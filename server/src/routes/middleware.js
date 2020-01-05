var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../utils/config');

const checkToken = (req, res, next) => {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided!' });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token!' });
    req.decoded = decoded;
    next();
  })
}
module.exports = {
  checkToken: checkToken,
}