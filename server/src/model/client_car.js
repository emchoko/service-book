'use strict';

module.exports = (connection, DataTypes) => {
    const ClientCar = connection.define('client_car', {
        license_plate: {
            primaryKey: true,
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