module.exports = (db, router) => {
  var createClient = (req, res) => {
    if (!req.body) return res.status(412).json({ message: 'Empty body' });
    if (!req.body.email) return res.status(412).json({ message: 'An error occured: Email not provided' });

    // async.waterfall()
    db.clients.create(req.body)
      .then((createdObj) => {
        res.json(createdObj);
      })
      .catch((err) => {
        res.status(500).json({ 'message': 'error' });
      });

    return res.json(req.body);
  };
  router.post('/client', createClient);
};
