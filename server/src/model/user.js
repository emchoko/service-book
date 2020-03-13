'use strict';

module.exports = (connection, DataTypes) => {
  const User = connection.define('user', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(500)
    }
  });
  return User;
};