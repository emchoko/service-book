module.exports = (db, app) => {
  var createClient = (req, res) => {
    if (!req.body) return res.status(412).json({ message: 'Empty body' });
    if (!req.body.email) return res.status(412).json({ message: 'An error occured: Email not provided' });

    async.waterfall([

      // find if the client already exists
      done => {
        db.clients.findOne({where: {email: req.body.email}})
        .then(client => {
          if(client !== null) {
            let error = new Error('Client with this email already exists');
            error.status = 412;
            done(error);
          }
        });
      },
      
      // create the client
      (done) => {
        db.clients.create(req.body)
        .then(client => {
          res.status(200).json(client);
        })
        .catch(err => {
          done(err);
        });
      }
    ],
      // error handling
      function (error) {
        if (error) {
          console.log(`status: ${error.status}`);
          res.status(error.status).json({ message: 'An error occured: ' + error.message });
        }
      });

    return res.json(req.body);
  };

  app.post('/client', createClient);
};