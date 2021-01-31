'use strict';

module.exports = (connection, DataTypes) => {

  const AutoDB = connection.define('auto_databases_one', {
    trim_id: {
      type: DataTypes.INTEGER,
    },
    trim: {
      type: DataTypes.STRING,
    },
    trim_ru: {
      type: DataTypes.STRING,
    },
    make_id: {
      type: DataTypes.INTEGER,
    },
    make: {
      type: DataTypes.STRING,
    },
    make_ru: {
      type: DataTypes.STRING,
    },
    model_id: {
      type: DataTypes.INTEGER,
    },
    model: {
      type: DataTypes.STRING,
    },
    model_ru: {
      type: DataTypes.STRING,
    },
    generation_id: {
      type: DataTypes.INTEGER,
    },
    generation: {
      type: DataTypes.STRING,
    },
    generation_ru: {
      type: DataTypes.STRING,
    },
    body_id: {
      type: DataTypes.INTEGER,
    },
    body: {
      type: DataTypes.STRING,
    },
    body_ru: {
      type: DataTypes.STRING,
    },
    drive_id: {
      type: DataTypes.INTEGER,
    },
    drive: {
      type: DataTypes.STRING,
    },
    drive_ru: {
      type: DataTypes.STRING,
    },
    gearbox_id: {
      type: DataTypes.INTEGER,
    },
    gearbox: {
      type: DataTypes.STRING,
    },
    gearbox_ru: {
      type: DataTypes.STRING,
    },
    engine_type_id: {
      type: DataTypes.INTEGER,
    },
    engine_type: {
      type: DataTypes.STRING,
    },
    engine_type_ru: {
      type: DataTypes.STRING,
    },
    engine_volume: {
      type: DataTypes.INTEGER,
    },
    engine_power: {
      type: DataTypes.INTEGER,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    },
    date_update: {
      type: DataTypes.DATE,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
    },
    old_id: {
      type: DataTypes.INTEGER,
    }
  }, {
    tableName: 'auto_databases_one',
    updatedAt: false,
    createdAt: false
  },
  )



  return AutoDB;
}