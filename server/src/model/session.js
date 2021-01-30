module.exports = (connection, DataTypes) => {
  const Session = connection.define('session', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    license_plate: {
      type: DataTypes.STRING,
    },
    additionalResults: {
      type: DataTypes.JSON
    }

  })
  return Session;
}