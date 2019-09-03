module.exports = (connection, DataTypes) => {
  const Session = connection.define('session', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    license_plate: {
      type: DataTypes.STRING
    },
    isLicensePlateRequired: {
      type: DataTypes.BOOLEAN
    }
  })
  return Session;
}