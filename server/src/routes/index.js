const clientRoute = require('./client');

const routes = [
  {
    path: '/client',
    handler: require('./client'),
  },
  {
    path: '/car',
    handler: require('./service'),
  },
  {
    path: '/session',
    handler: require('./session'),
  }
]

module.exports = (router, db) => {
  return routes.forEach((route) => {
    route.handler(route.path, db, router);
  });
};
