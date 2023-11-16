const CLIENT = require("../constants");
const { hashPass, comparePass } = require("../helpers/bcrypt");
const { createGameSessionLink } = require("../helpers/bitly");
const { createToken } = require("../helpers/jwt");
const { createQRCode } = require("../helpers/qrcode");
const { validateGame, validateGameObject } = require("../helpers/validateGame");
const { Admin, Game, Question, GameSession, SessionQuestion, GamePlayer } = require("../models");
const axios = require("axios");

module.exports = class AdminController {
  static async login(req, res, next) {
    try {
      req.body = req.body || {};

      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "badRequest", message: "Please fill the login form" };
      }

      const selectedAdmin = await Admin.findOne({
        where: {
          email,
        },
      });

      if (!selectedAdmin) {
        throw { name: "unauthorized", message: "Wrong email / password" };
      }

      if (!comparePass(password, selectedAdmin.password)) {
        throw { name: "unauthorized", message: "Wrong email / password" };
      }

      const payload = {
        id: "admin",
      };

      const admin_token = createToken(payload);

      return res.status(200).json({ admin_token });
    } catch (error) {
      return next(error);
    }
  }

  static async getGames(req, res, next) {
    try {
      const games = await Game.findAll({
        attributes: ["id", "title"],
        order: [["id", "ASC"]],
      });

      return res.status(200).json({ data: games });
    } catch (error) {
      return next(error);
    }
  }

  static async createGame(req, res, next) {
    try {
      const { files: gameFiles } = req;

      if (gameFiles.length === 0) {
        throw { name: "badRequest", message: "please fill the form" };
      }

      const gameObjects = [];

      for (const file of gameFiles) {
        if (file.mimetype !== "application/json") {
          throw { name: "badRequest", message: "invalid file(s)" };
        }

        const gameString = file.buffer.toString();
        const gameObject = JSON.parse(gameString);

        try {
          validateGameObject(gameObject);
          validateGame(gameObject.questions);
          gameObjects.push(gameObject);
        } catch (_) {
          throw { name: "badRequest", message: "Invalid Game(s)" };
        }
      }

      for (const gameObject of gameObjects) {
        const { title, questions } = gameObject;

        const createdGame = await Game.create({
          title,
        });

        for (const question of questions) {
          await Question.create({ ...question, GameId: createdGame.id });
        }
      }

      return res.status(200).json({ message: "OK" });
    } catch (error) {
      return next(error);
    }
  }

  static async updateGame(req, res, next) {
    try {
      const { id } = req.params;
      const { file } = req;

      if (!file) {
        throw { name: "badRequest", message: "please fill the form" };
      }

      const selectedGame = await Game.findByPk(id, {});

      if (!selectedGame) {
        throw { name: "notFound", message: "Game not found" };
      }

      if (file.mimetype !== "application/json") {
        throw { name: "badRequest", message: "invalid file" };
      }

      const gameString = file.buffer.toString();
      const gameObject = JSON.parse(gameString);

      try {
        validateGameObject(gameObject);
        validateGame(gameObject.questions);
      } catch (_) {
        throw { name: "badRequest", message: "Invalid Game" };
      }

      await selectedGame.update({ title: gameObject.title });

      await Question.destroy({
        where: {
          GameId: id,
        },
      });

      for (const question of gameObject.questions) {
        await Question.create({ ...question, GameId: id });
      }

      return res.status(200).json({ message: "OK" });
    } catch (error) {
      return next(error);
    }
  }

  static async deleteGame(req, res, next) {
    try {
      const { id } = req.params;

      const selectedGame = await Game.findByPk(id, {});

      if (!selectedGame) {
        throw { name: "notFound", message: "Game not found" };
      }

      // todo: tambahkan onDelete dan onUpdate pada tabel yang diperlukan
      await Question.destroy({
        where: {
          GameId: id,
        },
      });

      await selectedGame.destroy();

      return res.status(200).json({ message: "OK" });
    } catch (error) {
      return next(error);
    }
  }

  static async openSession(req, res, next) {
    try {
      const { id } = req.params;

      const selectedGame = await Game.findByPk(id, {});

      if (!selectedGame) {
        throw { name: "notFound", message: "Game not found" };
      }

      const createdSession = await GameSession.create({
        GameId: id,
        link: "test",
      });

      const questions = await Question.findAll({
        where: {
          GameId: id,
        },
      });

      for (const question of questions) {
        const { id } = question;

        await SessionQuestion.create({
          GameSessionId: createdSession.id,
          QuestionId: id,
        });
      }

      const link = await createGameSessionLink(createdSession.id);

      await createdSession.update({ link });

      return res.status(200).json({
        id: createdSession.id,
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async getSession(req, res, next) {
    try {
      const { gameSessionId } = req.params;

      const selectedGameSession = await GameSession.findOne({
        where: { id: gameSessionId },
        include: Game,
      });

      if (!selectedGameSession) {
        throw { name: "notFound", message: "Game not found" };
      }

      const {
        id,
        status,
        link,
        Game: { title },
      } = selectedGameSession;

      const qrcode = await createQRCode(link);

      const players = await GamePlayer.findAll({
        where: {
          GameSessionId: id,
        },
      });

      let redPlayers = [],
        bluePlayers = [];

      players.forEach((player) => {
        if (player.team === "red") {
          redPlayers.push(player.username);
        }

        if (player.team === "blue") {
          bluePlayers.push(player.username);
        }
      });

      let data = {
        title,
        link,
        qrcode,
        sessionQuestions: [],
        status,
        players: { red: redPlayers, blue: bluePlayers },
      };

      if (status !== "waiting") {
        const sessionQuestions = await SessionQuestion.findAll({
          where: {
            GameSessionId: gameSessionId,
          },
          include: [
            {
              model: Question,
            },
            {
              model: GamePlayer,
              as: "Solver",
            },
          ],
        });

        data.sessionQuestions = sessionQuestions;
      }

      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  }

  static async startSession(req, res, next) {
    try {
      const { gameSessionId } = req.params;

      const selectedGameSession = await GameSession.findOne({
        where: { id: gameSessionId },
        include: Game,
      });

      if (!selectedGameSession) {
        throw { name: "notFound", message: "Game not found" };
      }

      if (selectedGameSession.status !== "waiting") {
        throw { name: "forbidden", message: "Game Already Started / Ended" };
      }

      await selectedGameSession.update({
        status: "playing",
      });

      return res.status(200).json({ message: "OK" });
    } catch (error) {
      return next(error);
    }
  }

  static async endSession(req, res, next) {
    try {
      const { gameSessionId } = req.params;

      const selectedGameSession = await GameSession.findOne({
        where: { id: gameSessionId },
        include: Game,
      });

      if (!selectedGameSession) {
        throw { name: "notFound", message: "Game not found" };
      }

      if (selectedGameSession.status !== "playing") {
        throw { name: "forbidden", message: "Game not started or already ended" };
      }

      await selectedGameSession.update({
        status: "ended",
      });

      return res.status(200).json({ message: "OK" });
    } catch (error) {
      return next(error);
    }
  }

  static async getResult(req, res, next) {
    try {
      const { gameSessionId } = req.params;

      const selectedGameSession = await GameSession.findOne({
        where: { id: gameSessionId },
      });

      if (!selectedGameSession) {
        throw { name: "notFound", message: "Game not found" };
      }

      if (selectedGameSession.status === "waiting") {
        throw { name: "forbidden", message: "Game not started yet" };
      }

      if (selectedGameSession.status === "playing") {
        throw { name: "forbidden", message: "Game not finished yet" };
      }

      const players = await GamePlayer.findAll({
        where: {
          GameSessionId: gameSessionId,
        },
      });

      let redPlayers = [],
        bluePlayers = [];
      let redScore = 0,
        blueScore = 0;

      players.forEach((player) => {
        if (player.team === "red") {
          redPlayers.push(player.username);
          redScore += player.score;
        }

        if (player.team === "blue") {
          bluePlayers.push(player.username);
          blueScore += player.score;
        }
      });

      let data = {
        red: {
          players: redPlayers,
          score: redScore,
        },
        blue: {
          players: bluePlayers,
          score: blueScore,
        },
      };

      return res.status(200).json({ data });
    } catch (error) {
      // next(error);
      return next(error);
    }
  }

  // todo: buat getQrcode
};
