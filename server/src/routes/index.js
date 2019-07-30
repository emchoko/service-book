const clientRoute = require('./client');

const routes = [
  {
    path: '/client',
    handler: require('./client'),
  },
  {
    path: '/car',
    handler: require('./service'),
  }
]

module.exports = (router, db) => {
  return routes.forEach((route) => {
    route.handler(route.path, db, router);
  });
};
