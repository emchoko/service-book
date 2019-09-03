module.exports = (connection, DataTypes) => {
  const Session = connection.define('session', {
    license_plate: {
      type: DataTypes.STRING
    },
    isLicensePlateRequired: {
      type: DataTypes.BOOLEAN
    }
  })
}