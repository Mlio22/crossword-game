const bcryptjs = require("bcryptjs");

function hashPass(value) {
  return bcryptjs.hashSync(value, 10);
}

function comparePass(value, hashed) {
  return bcryptjs.compareSync(value, hashed);
}

module.exports = { hashPass, comparePass };
