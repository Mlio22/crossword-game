const { createToken } = require("../helpers/jwt");
const { Player } = require("../models");

module.exports = class PlayerController {
  static async login(req, res, next) {
    try {
      req.body = req.body || {};

      const { googleProfileID } = req.body;

      if (!googleProfileID) {
        throw { name: "badRequest", message: "Please login" };
      }

      const [selectedPlayer, createdPlayer] = await Player.findOrCreate({
        where: {googleProfileID},
        defaults: {
          googleProfileID,
        },
      });

      const id = (selectedPlayer || createdPlayer).id;

      const access_token = createToken({ id });

      return res.status(200).json({ access_token });
    } catch (error) {
      return next(error);
    }
  }

  static async signup(req, res, next) {
    try {
    } catch (error) {
      return next(error);
    }
  }

  static async getSessionById(req, res, next) {
    try {
    } catch (error) {
      return next(error);
    }
  }

  static async getQuestion(req, res, next) {
    try {
    } catch (error) {
      return next(error);
    }
  }

  static async answerQuestion(req, res, next) {
    try {
    } catch (error) {
      return next(error);
    }
  }
};
