var checkToken = require('./middleware').checkToken;
const async = require('async');

// path = api/v1/client
module.exports = (path, db, app) => {
  /**
   * Create a client in the db
   * 
   * @param {*} req - request (email or telephone required)
   * @param {*} res - response
   */
  var createClient = (req, res) => {
    if (!req.body) return res.status(412).json({ message: 'Empty body not allowed' });
    if (!req.body.license_plate && !req.body.telephone)
      return res.status(412).json({ message: 'Регистрационен номер е задължително ' });

    async.waterfall([
      // find if the client already exists
      done => {
        const queryObj = !req.body.license_plate ? { telephone: req.body.telephone } : { license_plate: req.body.license_plate };

        db.clients.findOne({ where: queryObj })
          .then(client => {
            if (client !== null) {
              return done({ statusCode: 412, cause: { message: 'Такъв потребител вече съществува! ' } });
            }
            return done(null);
          })
          .catch(dbError => {
            done(dbError);
          });
      },

      // create the client
      (done) => {
        db.clients.create(req.body)
          .then(client => {
            res.status(200).json(client);
            return done(null);
          })
          .catch(err => {
            return done({ statusCode: 500, cause: err });
          });
      }

    ],
      // error handling
      function (err) {
        if (err) {
          return res.status(err.statusCode).json(err.cause);
        }
        res.end();
      });
  };

  /**
   * Add car to a client
   * @param {*} req
   * @param {*} res 
   */
  var createCar = (req, res) => {
    if (!req.body) return res.status(412).json({ message: 'Empty body not allowed' });
    if (!req.body.license_plate || !req.body.make || !req.body.model || !req.body.api_car_id)
      return res.status(412).json({ isError: true, message: 'Попълнете полета - регистрационен номер, марка, модел, година и спецификация' });

    async.waterfall(
      [
        // check for the passed id
        done => {
          db.clients.findOne({ where: { id: req.params.id } })
            .then(dbResult => {
              if (dbResult === null) {
                return done({ statusCode: 404, cause: { isError: true, message: 'Потребител с това id не беше намерен!' } });
              }
              done(null, dbResult);
            });
        },

        //check if the internal car already exist
        (client, cb) => {

          const internalCarObj = {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            variant: req.body.variant,
            api_car_id: req.body.api_car_id,
          }

          db.internalCars.findOrCreate(
            {
              where: { api_car_id: req.body.api_car_id },
              defaults: internalCarObj
            }
          )
            .then(([carDbResponse, isCreated]) => {
              return cb(null, client, carDbResponse);
            })
            .catch(internalCarsDbError => {
              return cb({ statusCode: 502, cause: internalCarsDbError });
            });

        },

        // create the client car and connect it to the client and internal car
        (client, internalCar, done) => {
          const clientCarObj = {
            license_plate: req.body.license_plate,
            is_filter_particles: req.body.is_filter_particles,
            engine_code: req.body.engine_code
          };

          db.clientCars.findOrCreate({
            where: { license_plate: req.body.license_plate },
            defaults: clientCarObj
          })
            .then(([car, isCreated]) => {
              if (!isCreated) {
                return done({ statusCode: 412, cause: { message: 'Тази кола вече съществува!' } });
              }
              car.setInternalCar(internalCar);
              car.setClient(client);
              res.status(200).json(car);
              done(null);
            })
            .catch(dbErr => {
              return done({ statusCode: 503, cause: dbErr });
            });
        }
      ],
      function (err) {
        if (err) {
          return res.status(err.statusCode).json(err.cause);
        }
        res.end();
      }
    );

  };

  const checkClient = (req, res) => {
    db.clients.findOne({
      where: { email: req.params.email }
    })
      .then(result => {
        if (result) {
          return res.status(200).json(result);
        }
        return res.status(404).json({ message: 'Потребителят не беше намерен!' })
      })
      .catch(e => {
        console.log(e);
        return res.status(500).json({ message: 'Грешка в базата данни!', error: e });
      })
  }

  const updateCar = (req, res) => {
    async.waterfall(
      [
        cb => {
          db.internalCars.findOrCreate({
            where: { api_car_id: req.body.internalCar.api_car_id },
            defaults: req.body.internalCar
          })
            .then(([internalCar, isCreated]) => {
              console.warn(isCreated);
              return cb(null, internalCar);
            })
            .catch(internalCarsDbError => {
              return cb({ statusCode: 502, cause: internalCarsDbError });
            });
        },
        (internalCar, cb) => {
          console.warn(req.body);
          db.clientCars.findOne({
            where: { license_plate: req.params.license_plate },
            include: [{ model: db.internalCars, as: 'internalCar' }]
          })
            .then(dbResult => {
              dbResult.update({
                license_plate: req.body.license_plate,
                is_filter_particles: req.body.is_filter_particles,
                engine_code: req.body.engine_code,
              })
                .then(updatedCar => {
                  updatedCar.setInternalCar(internalCar)
                  .then(u => {
                    console.info('returning here');
                    res.status(200).json(u);
                    return cb(null);
                  });
                });

            })
            .catch(e => {
              console.log(e);
              return cb({ statusCode: 503, cause: e });
            });
        }
      ], function (err) {
        if (err) {
          return res.status(err.statusCode).json(err.cause);
        }
        // res.end();
      });
  }

  app.get(path + '/:email', checkClient);
  app.post(path, checkToken, createClient);
  app.post(path + '/:id/car', checkToken, createCar);
  app.put(path + '/car/:license_plate', checkToken, updateCar);
};