function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "unauthorized":
      return res.status(401).json({ message: err.message });
    case "JsonWebTokenError":
      return res.status(401).json({ message: "invalid token" });
    case "forbidden":
      return res.status(403).json({ message: err.message });

    case "notFound":
      return res.status(404).json({ message: err.message });

    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      return res.status(400).json(err.errors.map((error) => error.message));

    case "badRequest":
      return res.status(400).json({ message: err.message });

    default:
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { errorHandler };
