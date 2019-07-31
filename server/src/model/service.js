module.exports = (connection, DataTypes) => {
  const Service = connection.define('service', {
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
    },
    kilometers: {
      type: DataTypes.INTEGER,
    },
    next_change_km: {
      type: DataTypes.INTEGER,
    },
    length_of_service: {
      type: DataTypes.INTEGER,
    },
    fluid_amount: {
      type: DataTypes.FLOAT,
    }
  });

  return Service;
}