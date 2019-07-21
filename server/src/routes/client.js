const async = require('async');

module.exports = (path, db, app) => {
  var createClient = (req, res) => {
    if (!req.body) return res.status(412).json({ message: 'Empty body' });
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
              return done();
            }
            return done();
          })
          .catch(dbError => {
            return done(dbError);
          });
      },

      // create the client
      (done) => {
        db.clients.create(req.body)
          .then(client => {
            res.status(200).json(client);
            return done();
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
        res.end();
      });
  };

  app.post(path, createClient);
};