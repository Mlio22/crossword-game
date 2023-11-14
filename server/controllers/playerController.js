const { createToken } = require("../helpers/jwt");
const { randomTeam } = require("../helpers/random");
const { Player, GamePlayer, GameSession, SessionQuestions, Question } = require("../models");

module.exports = class PlayerController {
  static async login(req, res, next) {
    try {
      req.body = req.body || {};

      const { googleProfileID } = req.body;

      if (!googleProfileID) {
        throw { name: "badRequest", message: "Please login" };
      }

      const [selectedPlayer, createdPlayer] = await Player.findOrCreate({
        where: { googleProfileID },
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
      const { username, gameSessionId } = req.body || {};

      if (!username) {
        throw { name: "badRequest", message: "Please fill the username" };
      }

      if (!gameSessionId) {
        throw { name: "notFound", message: "Game not found" };
      }

      const selectedGameSession = await GameSession.findOne({
        where: { id: gameSessionId },
      });

      if (!selectedGameSession) {
        throw { name: "notFound", message: "Game not found" };
      }

      if (selectedGameSession.status !== "waiting") {
        throw { name: "notFound", message: "Game already started / closed" };
      }

      const duplicateUsername = await GamePlayer.findOne({
        where: {
          username,
          GameSessionId: gameSessionId,
        },
      });

      if (duplicateUsername) {
        throw { name: "badRequest", message: "Duplicate name" };
      }

      const { id: PlayerId } = req.user;
      await GamePlayer.create({
        PlayerId,
        GameSessionId: gameSessionId,
        username,
        team: randomTeam(),
      });

      return res.status(200).json({ message: "OK" });
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
