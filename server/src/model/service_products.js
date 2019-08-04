module.exports = (connection, DataTypes) => {
  const ServiceProducts = connection.define('service_products', {
    fluid_amount: {
      type: DataTypes.FLOAT,
    }
  });
}