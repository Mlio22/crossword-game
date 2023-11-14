"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Player.init(
    {
      googleProfileID: {
        type: DataTypes.STRING,
        unique: {
          msg: "Google Id must be unique",
        },
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Google Id should not empty",
          },
          notNull: {
            msg: "Google Id should not null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Player",
    }
  );
  return Player;
};
