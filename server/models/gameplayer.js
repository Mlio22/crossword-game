"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GamePlayer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GamePlayer.belongsTo(models.Player, { onDelete: "CASCADE", onUpdate: "CASCADE" });
      GamePlayer.belongsTo(models.GameSession, { onDelete: "CASCADE", onUpdate: "CASCADE" });
      GamePlayer.hasMany(models.SessionQuestion, { foreignKey: "SolverPlayerId", onDelete: "CASCADE", onUpdate: "CASCADE" });
    }
  }
  GamePlayer.init(
    {
      PlayerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "player id should not empty",
          },
          notNull: {
            msg: "player id should not null",
          },
        },
      },
      GameSessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "game session id should not empty",
          },
          notNull: {
            msg: "game session id should not null",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "username should not empty",
          },
          notNull: {
            msg: "username should not null",
          },
        },
      },
      team: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "team should not empty",
          },
          notNull: {
            msg: "team should not null",
          },
        },
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          notEmpty: {
            msg: "score should not empty",
          },
          notNull: {
            msg: "score should not null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "GamePlayer",
    }
  );
  return GamePlayer;
};
