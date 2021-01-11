'use strict';

module.exports = (connection, DataTypes) => {
    const ClientCar = connection.define('client_car', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        license_plate: {
            type: DataTypes.STRING(20),
            unique: true,
        },
        is_filter_particles: {
            type: DataTypes.BOOLEAN
        },
        engine_code: {
            type: DataTypes.STRING(30)
        }
    });
    return ClientCar;
};