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
    if (!req.body.email && !req.body.telephone)
      return res.status(412).json({ message: 'Either email or telephone should be provided' });

    async.waterfall([
      // find if the client already exists
      done => {
        const queryObj = !req.body.email ? { telephone: req.body.telephone } : { email: req.body.email };

        db.clients.findOne({ where: queryObj })
          .then(client => {
            if (client !== null) {
              return done({ statusCode: 412, cause: { message: 'User with this email or phone already exists' } });
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
      return res.status(412).json({ isError: true, message: 'license_plate,  and model are reqired' });

    async.waterfall(
      [
        // check for the passed id
        done => {
          db.clients.findOne({ where: { id: req.params.id } })
            .then(dbResult => {
              if (dbResult === null) {
                return done({ statusCode: 404, cause: { isError: true, message: 'User with this id not found!' } });
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
            power_in_hp: req.body.power_in_hp,
            is_filter_particles: req.body.is_filter_particles,
            engine_code: req.body.engine_code
          };

          db.clientCars.findOrCreate({
            where: { license_plate: req.body.license_plate },
            defaults: clientCarObj
          })
            .then(([car, isCreated]) => {
              if (!isCreated) {
                return done({ statusCode: 412, cause: { message: 'This car already exists' } });
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

  app.post(path, createClient);
  app.post(path + '/:id/car', createCar);
};