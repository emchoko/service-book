const async = require('async');

// path = api/v1/car

module.exports = (path, db, app) => {

  /**
   * Create a service record
   * 
   * @param {*} req 
   * @param {*} res 
   */
  const createService = (req, res) => {
    if (!req.body) return res.status(412).json({ message: 'Empty body' });
    if (!req.body.kilometers) return res.status(412).json({ message: 'Kilometers cannot be empty' });

    async.waterfall(
      [
        // Check if the license plate exists
        (done) => {
          db.clientCars.findOne({ where: { license_plate: req.params.license_plate } })
            .then(dbResult => {
              if (dbResult === null) {
                return done({
                  statusCode: 404, cause:
                    { isError: true, message: 'No car was found with this license plate' }
                });
              }
              done(null, dbResult);
            })
            .catch((err) => {
              return done({ statusCode: 500, cause: err });
            })
        },
        
        // Create the service record itself
        (car, cb) => {
          db.services.create(req.body)
            .then((service) => {
              // service.setClientCar(car);
              car.addService(service);
              res.status(200).json(service);
              cb(null);
            })
            .catch((dbErr) => {
              console.log(dbErr);
              return cb({ statusCode: 503, cause: dbErr });
            });
        }

      ],
      function (err) {
        if (err) {
          return res.status(err.statusCode).json(err.cause);
        }
        res.end();
      }
    )
  }

  app.post(path + '/:license_plate/service', createService)
}