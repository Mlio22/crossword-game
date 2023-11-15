function randomTeam() {
  const random = Math.round(Math.random());

  return random ? "red" : "blue";
}

module.exports = { randomTeam };
