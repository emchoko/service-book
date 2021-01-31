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
  },
  {
    path: '/license_plate',
    handler: require('./license_plate'),
  },
  {
    path: '/cars',
    handler: require('./cars'),
  },
  {
    path: '/auth',
    handler: require('./auth'),
  },
]

module.exports = (router, db) => {
  return routes.forEach((route) => {
    route.handler(route.path, db, router);
  });
};
