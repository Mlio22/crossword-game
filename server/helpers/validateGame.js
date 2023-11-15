const { getBoxes, findIntersectingIndexes } = require("./clues");

function validateGame(gameObject) {
  for (let i = 0; i < gameObject.length; i++) {
    const currentQuestion = gameObject[i];
    const currentBox = getBoxes(currentQuestion);

    for (let j = 0; j < gameObject.length; j++) {
      if (i == j) continue;
      const otherQuestion = gameObject[j];
      const otherBox = getBoxes(otherQuestion);

      const foundIndex = findIntersectingIndexes(currentBox, otherBox);

      const currentIndex = currentBox.indexOf(foundIndex);
      const otherIndex = currentBox.indexOf(foundIndex);

      if (currentQuestion.word[currentIndex] !== otherQuestion.word[otherIndex]) {
        throw Error();
      }
    }
  }
}

function validateGameObject(gameObject) {
  const { title, questions } = gameObject;

  if (!title || !questions) {
    throw Error();
  }

  for (const question of questions) {
    const { word, hint, startCoordinateX, startCoordinateY, direction } = question;

    if (!word || !hint || !startCoordinateX || !startCoordinateY || !direction) {
      throw Error();
    }
  }
}

module.exports = { validateGame, validateGameObject };
