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
    if (!req.body.products) return res.status(412).json({ message: 'Products cannot be empty' });
    if (req.body.products.length === 0) return res.status(412).json({ message: 'Products cannot be empty' });


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
              car.addService(service);
              // TODO: remove res.status(200).json(service);
              cb(null, service);
            })
            .catch((dbErr) => {
              console.log(dbErr);
              return cb({ statusCode: 503, cause: dbErr });
            });
        },

        // Create product by product
        (service, callback) => {
          createProductsFromList(req.body.products, service).then(() => {
            callback(null, service);
          });
        },

        (service, cb) => {
          db.services.findOne({
            where: { id: service.id },
            include: [db.products]
          })
            .then((serviceProducts) => {
              return res.status(200).json(serviceProducts);
            })
            .catch(err => {
              console.log(err);
              return cb({ statusCode: 503, cause: err });
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

  /**
   * Create in the db all the product records
   * 
   * @param {list of products} products 
   */
  var createProductsFromList = function (products, service) {
    return products.reduce((promise, product) => {
      return promise.then(() => {
        // create the product
        db.products.findOrCreate({
          where: { type: product.type, code: product.code },
          defaults: { product }
        })
          .then(([dbProduct, isCreated]) => {
            if (dbProduct === null) {
              console.log({ message: 'One of the products couldn\'t be created' });
            }
            dbProduct.addService(service);
          });
      });
    }, Promise.resolve());
  }

  app.post(path + '/:license_plate/service', createService)

  // TODO: for testing purposes
  app.get(path + '/service/:id', (req, res) => {
    db.services.findOne({
      where: { id: req.params.id },
      include: [db.products]
    })
      .then((serviceProducts) => {
        return res.status(200).json(serviceProducts);
      });
    // .catch(err =)

  });
}