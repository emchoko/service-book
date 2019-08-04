module.exports = (connection, DataTypes) => {
  const Product = connection.define('product', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    product_type: {
      type: DataTypes.STRING(100),
      nullable: false,
    },
    code: {
      type: DataTypes.STRING(200),
      nullable: false,
    },
    brand: {
      type: DataTypes.STRING(200)
    }
  });
  return Product;
}