const { findClues } = require("../helpers/clues");
const { createToken } = require("../helpers/jwt");
const { randomTeam } = require("../helpers/random");
const { Player, Game, GamePlayer, GameSession, SessionQuestion, Question } = require("../models");

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
        throw { name: "notFound", message: "Game already started / ended" };
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
      const { gameSessionId } = req.params;

      const selectedGameSession = await GameSession.findOne({
        where: { id: gameSessionId },
        include: Game
      });

      const { status, link, Game: {title} } = selectedGameSession;

      let data = {
        title,
        link,
        sessionQuestions: [],
        status,
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

      res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  }

  static async getQuestion(req, res, next) {
    try {
      const { gameSessionId, sessionQuestionId } = req.params;

      const selectedGameSession = await GameSession.findOne({
        where: { id: gameSessionId },
      });

      if (selectedGameSession.status === "waiting") {
        throw { name: "forbidden", message: "Game not started yet" };
      }

      const selectedQuestion = await SessionQuestion.findOne({
        where: { id: sessionQuestionId, GameSessionId: gameSessionId },
        include: [
          {
            model: GamePlayer,
            as: "Solver",
          },
          Question,
        ],
      });

      if (!selectedQuestion) {
        throw { name: "notFound", message: "Question not found" };
      }

      // searching clues
      const questions = await SessionQuestion.findAll({
        where: {
          GameSessionId: gameSessionId,
          isSolved: true,
        },
        include: Question,
      });

      const clues = findClues(selectedQuestion, questions);
      selectedQuestion.setDataValue("clues", clues);

      return res.status(200).json({ selectedQuestion });
    } catch (error) {
      return next(error);
    }
  }

  static async answerQuestion(req, res, next) {
    try {
      const { gameSessionId, sessionQuestionId } = req.params;
      let { answer } = req?.body;

      const selectedGameSession = await GameSession.findOne({
        where: { id: gameSessionId },
      });

      if (selectedGameSession.status === "waiting") {
        throw { name: "forbidden", message: "Game not started yet" };
      }

      if (!answer) {
        throw { name: "badRequest", message: "Please fill the answer" };
      }

      answer = answer.toUpperCase();

      const selectedQuestion = await SessionQuestion.findOne({
        where: { id: sessionQuestionId, GameSessionId: gameSessionId },
        include: [
          {
            model: GamePlayer,
            as: "Solver",
          },
          Question,
        ],
      });

      if (!selectedQuestion) {
        throw { name: "notFound", message: "Question not found" };
      }

      if (selectedQuestion.Solver) {
        return res.status(200).json({ message: "already solved" });
      }

      if (selectedQuestion.Question.word !== answer) {
        return res.status(200).json({ message: "wrong" });
      }

      const gamePlayer = req.gamePlayer;

      await selectedQuestion.update({
        isSolved: true,
        SolverPlayerId: gamePlayer.id,
      });

      await gamePlayer.increment({ score: 100 });

      return res.status(200).json({ message: "correct" });
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

      return res.status(200).json({data});
    } catch (error) {
      return next(error);
    }
  }
};
