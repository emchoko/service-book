module.exports = (connection, DataTypes) => {
  const Session = connection.define('session', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    license_plate: {
      type: DataTypes.STRING
    },
    is_license_plate_required: {
      type: DataTypes.BOOLEAN
    }
  })
  return Session;
}