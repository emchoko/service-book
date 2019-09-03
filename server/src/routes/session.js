

module.exports = (path, db, app) => {

  const errHandler = (err, res) => {
    res.status(err.statusCode).json(err.cause);
  }

  const getSessionInfo = (_, res) => {
    db.session.findOne({ where: { id: 1 } })
      .then(result => {
        if (result) {
          return res.status(200).json(result);
        }
      })
      .catch(error => errHandler(error, res));
  }

  // TODO: endpoint to PUT license (service becomes false)
  // TODO: endpoint to UPDATE service (if service -> true then license -> false)



  // TODO: endpoint to GET license
  app.get(path, getSessionInfo);
}
