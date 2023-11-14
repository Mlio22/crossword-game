const { hashPass, comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Admin } = require("../models");

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
    } catch (error) {
      return next(error);
    }
  }

  static async createGame(req, res, next) {
    try {
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
