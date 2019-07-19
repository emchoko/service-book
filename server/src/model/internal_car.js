'use strict'
module.exports = (connection, DataTypes) => {
    const InternalCar = connection.define('internal_car', {
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT,
            autoIncrement: true,
        },
        make: {
            type: DataTypes.STRING(50),
        },
        model: {
            type: DataTypes.STRING(100),
        },
        year: {
            type: DataTypes.INTEGER,
        },
        variant: {
            type: DataTypes.STRING,
        },
        api_car_id: {
            type: DataTypes.STRING,
        }
    });
    return InternalCar;
}