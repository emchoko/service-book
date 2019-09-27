// path = api/v1/license_plate

module.exports = (path, db, app) => {

  const checkLicensePlate = (req, res) => {
    if (req.params.license_plate.length < 6) {
      return res.status(412).json({ message: 'License plate not valid' });
    }

    db.clientCars.findOne({
      where: { license_plate: req.params.license_plate }
    })
      .then(result => {
        if (result) {
          return res.status(200).json(result);
        }
        return res.status(404).json({ message: 'License plate not found' });
      })
      .catch(e => {
        console.log(e);
        return res.status(500).json(e.message);
      })
  };

  app.get(path + '/:license_plate', checkLicensePlate);
}