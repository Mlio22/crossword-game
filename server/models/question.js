"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Question.init(
    {
      word: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Word should not empty",
          },
          notNull: {
            msg: "Word should not null",
          },
        },
      },
      hint: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Hint should not empty",
          },
          notNull: {
            msg: "Hint should not null",
          },
        },
      },
      GameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Game ID should not empty",
          },
          notNull: {
            msg: "Game ID should not null",
          },
        },
      },
      startCoordinateX: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Start Coordinate X should not empty",
          },
          notNull: {
            msg: "Start Coordinate X should not null",
          },
        },
      },
      startCoordinateY: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Start Coordinate Y should not empty",
          },
          notNull: {
            msg: "Start Coordinate Y should not null",
          },
        },
      },
      direction: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Direction should not empty",
          },
          notNull: {
            msg: "Direction should not null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
