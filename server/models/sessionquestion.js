'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SessionQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SessionQuestion.init({
    GameSessionId: DataTypes.INTEGER,
    QuestionId: DataTypes.INTEGER,
    isSolved: DataTypes.BOOLEAN,
    solverPlayerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SessionQuestion',
  });
  return SessionQuestion;
};