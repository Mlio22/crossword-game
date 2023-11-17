"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SessionQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SessionQuestion.belongsTo(models.GameSession, { onDelete: "CASCADE", onUpdate: "CASCADE" });
      SessionQuestion.belongsTo(models.Question, { onDelete: "CASCADE", onUpdate: "CASCADE" });
      SessionQuestion.belongsTo(models.GamePlayer, { as: "Solver", foreignKey: "SolverPlayerId", onDelete: "CASCADE", onUpdate: "CASCADE" });
    }
  }
  SessionQuestion.init(
    {
      GameSessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Game Session ID should not empty",
          },
          notNull: {
            msg: "Game Session ID should not null",
          },
        },
      },
      QuestionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Question ID should not empty",
          },
          notNull: {
            msg: "Question ID should not null",
          },
        },
      },
      isSolved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notEmpty: {
            msg: "is Solved should not empty",
          },
          notNull: {
            msg: "is Solved should not null",
          },
        },
      },
      SolverPlayerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "SessionQuestion",
    }
  );
  return SessionQuestion;
};
