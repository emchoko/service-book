const async = require('async');

// path = api/v1/client
module.exports = (path, db, app) => {
  /**
   * Create a client in the db
   * 
   * @param {*} req - request (email or telephone required)
   * @param {*} res - response
   */
  var createClient = (req, res) => {
    if (!req.body) return res.status(412).json({ message: 'Empty body not allowed' });
    if (!req.body.email && !req.body.telephone)
      return res.status(412).json({ message: 'Either email or telephone should be provided' });

    async.waterfall([
      // find if the client already exists
      done => {
        const queryObj = !req.body.email ? { telephone: req.body.telephone } : { email: req.body.email };
        db.clients.findOne({ where: queryObj })
          .then(client => {
            if (client !== null) {
              res.status(412).json({ message: 'User with this email already exists' });
              return done(null);
            }
            return done(null);
          })
          .catch(dbError => {
            done(dbError);
          });
      },

      // create the client
      (done) => {
        db.clients.create(req.body)
          .then(client => {
            res.status(200).json(client);
            return done(null);
          })
          .catch(err => {
            return done(err);
          });
      }

    ],
      // error handling
      function (error) {
        if (error) {
          return res.status(500).json(error);
        }
        // res.end();
      });
  };

  /**
   * Add car to a client
   * @param {*} req
   * @param {*} res 
   */
  var createCar = (req, res) => {
    if (!req.body) return res.status(412).json({ message: 'Empty body not allowed' });
  };

  app.post(path, createClient);
  app.post(path + '/:id/car', createCar);
};