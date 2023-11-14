const { verifyToken } = require("../helpers/jwt");

function mustAuthenticated(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw { name: "unauthorized", message: "please login first" };
    }

    const [type, token] = authorization.split(" ");

    if (!type || type !== "Bearer") {
      throw { name: "unauthorized", message: "invalid token" };
    }

    if (!token) {
      throw { name: "unauthorized", message: "invalid token" };
    }

    const { id } = verifyToken(token);

    req.user = { id };
    next();
  } catch (error) {
    next(error);
  }
}

function mustAdmin(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw { name: "unauthorized", message: "please login first" };
    }

    const [type, token] = authorization.split(" ");

    if (!type || type !== "Bearer") {
      throw { name: "unauthorized", message: "invalid token" };
    }

    if (!token) {
      throw { name: "unauthorized", message: "invalid token" };
    }

    const { id } = verifyToken(token);

    if (!id !== "admin") throw { name: "unauthorized", message: "invalid token" };

    req.user = { id };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { mustAuthenticated, mustAdmin };
