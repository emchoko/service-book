'use strict';
module.exports = (connection, DataTypes) => {
  const User = connection.define('client', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    telephone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
  return User;
};
