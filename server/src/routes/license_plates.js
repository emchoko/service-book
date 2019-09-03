

module.exports = (path, db, app) => {

  const getLicensePlate = (req, res) => {
    db.findOne
      res.status('')
  }

  // TODO: endpoint to PUT license (service becomes false)
  // TODO: endpoint to UPDATE service (if service -> true then license -> false)



  // TODO: endpoint to GET license
  app.get(path + '/license_plate', getLicensePlate);
}