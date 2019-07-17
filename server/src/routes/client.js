const async = require('async');

module.exports = (db, app) => {
  var createClient = (req, res) => {
    if (!req.body) return res.status(412).json({ message: 'Empty body' });
    if (!req.body.email) return res.status(412).json({ message: 'An error occured: Email not provided' });

    async.waterfall([

      // find if the client already exists
      done => {
        db.clients.findOne({ where: { email: req.body.email } })
          .then(client => {
            if (client !== null) {
              res.status(412).json({message: 'User with this email already exists'});
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

  app.post('/client', createClient);
};