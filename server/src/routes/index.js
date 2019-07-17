const clientRoute = require('./client');

const routes = [
  {
    path: '/client',
    handler: require('./client')
  }
]

module.exports = (router, db) => {
  return routes.forEach((route) => {
    route.handler(route.path, db, router);
  });
};
