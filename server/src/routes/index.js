const clientRoute = require('./client');

module.exports = (router, db) => {
  router.get('/', function (_, res, _) {
    res.json({ title: 'Express' });
  });

  clientRoute(db, router);

  return router;
};
