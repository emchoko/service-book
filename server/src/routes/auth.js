var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../utils/config');

module.exports = (path, db, app) => {

  const registerUser = (req, res) => {
    console.log(`tokenToRegister: ${req.body.tokenToRegister === 'smenimaslotosecret'}`);
    console.log(`tokenToRegister: ${req.body.username}`);
    if (req.body.tokenToRegister === 'smenimaslotosecret') {
      var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      db.users.create(
        {
          username: req.body.username,
          password: hashedPassword
        }
      )
        .then((user) => {
          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400,
          });
          return res.status(200).json({ token: token });
        })
        .catch((err) => {
          res.status(500).json({ message: 'Error while creating user!', err: err });
        });

    } else {
      return res.status(412).json({ message: 'Insufficient crendentials' });
    }
  }

  app.post(path + '/register', registerUser);
}