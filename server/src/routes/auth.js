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

  const loginUser = (req, res) => {
    db.users.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) return res.status(404).json({ message: "User not found" });
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400,
        });

        return res.status(200).send({ auth: true, token: token });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      })
  }

  const verifyToken = (req, res) => {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided!' });

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token!' });

      return res.status(200).send(decoded);
    })
  }
  app.post(path + '/register', registerUser);
  app.post(path + '/login', loginUser);
  app.get(path, verifyToken);
}