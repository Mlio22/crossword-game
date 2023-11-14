'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GamePlayer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GamePlayer.init({
    PlayerId: DataTypes.INTEGER,
    GameSessionId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    team: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GamePlayer',
  });
  return GamePlayer;
};