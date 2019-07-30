const async = require('async');

// path = api/v1/client

module.exports = (path, db, app) => {

  const createService = (req, res) => {
    res.send('Hello');
  }

  app.post(path + '/:license_plate/service', createService)
}