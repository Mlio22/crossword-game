const { hashPass, comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { validateGame, validateGameObject } = require("../helpers/validateGame");
const { Admin, Game, Question } = require("../models");

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
    } catch (error) {
      return next(error);
    }
  }

  static async deleteGame(req, res, next) {
    try {
    } catch (error) {
      return next(error);
    }
  }

  static async getSession(req, res, next) {
    try {
    } catch (error) {
      return next(error);
    }
  }

  static async openSession(req, res, next) {
    try {
    } catch (error) {
      return next(error);
    }
  }

  static async startSession(req, res, next) {
    try {
    } catch (error) {
      return next(error);
    }
  }

  static async endSession(req, res, next) {
    try {
    } catch (error) {
      return next(error);
    }
  }

  static async getResult(req, res, next) {
    try {
    } catch (error) {
      return next(error);
    }
  }
};
