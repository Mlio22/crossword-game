function errorHandler(err, req, res, next) {
  const { name } = err;

  delete err.name;

  switch (name) {
    case "unauthorized":
      return res.status(401).json(err);
    case "unauthorizedRef":
      return res.status(401).json(err);
    case "JsonWebTokenError":
      return res.status(401).json({ message: "invalid token" });
    case "forbidden":
      return res.status(403).json(err);

    case "notFound":
      return res.status(404).json(err);

    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      return res.status(400).json(err.errors.map((error) => error.message));

    case "badRequest":
      return res.status(400).json(err);

    default:
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { errorHandler };
