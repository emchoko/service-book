module.exports = {
  createClient: (req, res) => {
    if (!req.body.email) {
      return res.json({message: 'An error occured: Email not provided'});
    }

    db.clients.create(req.body)
        .then((createdObj) => {
          res.json(createdObj);
        })
        .catch((err) => {
          res.status(500).json({'message': 'error'});
        });

    return res.json(req.body);
  },
};
