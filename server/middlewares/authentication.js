const { verifyToken } = require("../helpers/jwt");
const { Player, GamePlayer, GameSession, SessionQuestion, Question } = require("../models");

function mustAuthenticated(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    const { gameSessionId } = req?.params;

    if (!authorization) {
      throw { name: "unauthorized", message: "please login first", gameSessionId };
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
    return next();
  } catch (error) {
    return next(error);
  }
}

// todo: buat middleware untuk pengecekan gameSession, lalu oper ke req
async function mustRegistered(req, res, next) {
  try {
    const { gameSessionId } = req?.params;
    const { id: PlayerId } = req.user;

    if (!gameSessionId) {
      throw { name: "notFound", message: "Game not found" };
    }

    const selectedGameSession = await GameSession.findOne({
      where: { id: gameSessionId },
    });

    if (!selectedGameSession) {
      throw { name: "notFound", message: "Game not found" };
    }

    // checks user already joined
    const selectedGamePlayer = await GamePlayer.findOne({
      where: {
        GameSessionId: gameSessionId,
        PlayerId,
      },
    });

    if (!selectedGamePlayer) {
      throw { name: "unauthorized", message: "Not registered", gameSessionId };
    }

    req.gamePlayer = { id: selectedGamePlayer.id };

    return next();
  } catch (error) {
    return next(error);
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

    // todo: ganti jadi forbidden
    if (!id !== "admin") throw { name: "unauthorized", message: "invalid token" };

    req.user = { id };
    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = { mustAuthenticated, mustAdmin, mustRegistered };
