module.exports = (db, router) => {
  var createClient = (req, res) => {
    if (!req.body) return res.status(412).json({ message: 'Empty body' });
    if (!req.body.email) return res.status(412).json({ message: 'An error occured: Email not provided' });

    // async.waterfall([], function(error))
    // check if user with this email exists
    // create the user

    async.waterfall([
      done => {
        db.clients.findOne({where: {email: req.body.email}})
        .then(client => {
          if(client !== null)
            done(new Error('Client with this email already exists'));
        });
        done(err);
      },
      
      (done, object) => {
        db.clients.create();
      }
    ],
      function (error) {
        if (error) {
          res.status(500).json({ message: 'An error occured: ' + error.message });
        }
      });

    return res.json(req.body);
  };

  router.post('/client', createClient);
};