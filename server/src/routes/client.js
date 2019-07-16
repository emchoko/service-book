module.exports = (db, router) => {
  var createClient = (req, res) => {
    if (!req.body) return res.status(412).json({ message: 'Empty body' });
    if (!req.body.email) return res.status(412).json({ message: 'An error occured: Email not provided' });

    // async.waterfall([], function(error))
    // check if user with this email exists
    // create the user

    async.waterfall([
      done => {
        const err = new Error;
        err.message = 'User already exists';
        done(err);
      },
      
      (done, object) => {
        
      }
    ],
      function (error) {
        if (error) {
          res.status(500).json({ message: 'An error occured: ' + error.message });
        }
      });

    return res.json(req.body);
  };
  // router.post('/client', createClient);
};
