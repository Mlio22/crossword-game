"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GameSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GameSession.belongsTo(models.Game, { onDelete: "CASCADE", onUpdate: "CASCADE" });
      GameSession.hasMany(models.GamePlayer, { onDelete: "CASCADE", onUpdate: "CASCADE" });
    }
  }
  GameSession.init(
    {
      GameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Game id should not empty",
          },
          notNull: {
            msg: "Game id should not null",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "waiting",
        validate: {
          notEmpty: {
            msg: "status should not empty",
          },
          notNull: {
            msg: "status should not null",
          },
        },
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "link should not empty",
          },
          notNull: {
            msg: "link should not null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "GameSession",
    }
  );
  return GameSession;
};
