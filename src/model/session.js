module.exports = (connection, DataTypes) => {
  const Session = connection.define('session', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    license_plate: {
      type: DataTypes.STRING,
    },
    additional_results: {
      type: DataTypes.STRING,
    },
  });
  return Session;
};
