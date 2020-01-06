var checkToken = require('./middleware').checkToken;

module.exports = (path, db, app) => {

  const errHandler = (err, res) => {
    console.log(err.cause);
    res.status(err.statusCode).json(err.cause);
  }

  const getSessionInfo = (_, res) => {
    db.session.findOne({ where: { id: 1 } })
      .then(result => {
        if (result) {
          return res.status(200).json(result);
        }
      })
      .catch(error => errHandler({ statusCode: 500, cause: error }, res));
  }

  const updateSessionInfo = (req, res) => {
    db.session.findOne({ where: { id: 1 } })
      .then(result => {
        result.update({
          license_plate: req.body.license_plate,
          is_license_plate_required: req.body.is_license_plate_required,
        })
          .then((r) => {
            res.status(200).json(r);
          })
          .catch(error => errHandler({ statusCode: 500, cause: error }, res));
      })
      .catch(error => errHandler({ statusCode: 500, cause: error }, res))
  }

  app.get(path, getSessionInfo);
  // TODO: add middleware for token verification
  // app.put(path, checkToken, updateSessionInfo);
  app.put(path, updateSessionInfo);
}
