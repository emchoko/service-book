
// path = api/v1/license_plate

module.exports = (path, db, app) => {

  const checkLicensePlate = (req, res) => {
    res.status(200).json({ hello: 'world' });
  };

  app.get(path + '/license_plate/:license_plate', checkLicensePlate);
}