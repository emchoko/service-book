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
    next_oil_change_km: {
      type: DataTypes.INTEGER,
    },
    next_gearbox_oil_change: {
      type: DataTypes.INTEGER,
    },
    is_automatic: {
      type: DataTypes.BOOLEAN
    },
    next_hydraulics_oil_change: {
      type: DataTypes.INTEGER
    },
    length_of_service: { 
      type: DataTypes.INTEGER,
    },
    notes: {
      type: DataTypes.STRING(500),
    }
  });

  return Service;
}