const LENGTH_X = 12;
const LENGTH_Y = 12;

function getBoxes(question) {
  const { word, startCoordinateX, startCoordinateY, direction } = question;

  const startBox = (startCoordinateY - 1) * LENGTH_X + startCoordinateX;
  let lastBox = startBox;

  const boxes = [startBox];

  let interval = direction === "straightward" ? 1 : LENGTH_X;

  let i = 1;
  while (i < word.length) {
    lastBox += interval;
    boxes.push(lastBox);
    i++;
  }

  return boxes;
}

function findIntersectingIndex(box1, box2) {
  for (const i of box2) {
    if (box1.includes(i)) {
      return box1.indexOf(i);
    }
  }

  return null;
}

// todo: transformasikan fungsi diatas menjadi dibawah
function findIntersectingIndexes(box1, box2) {
  for (const i of box2) {
    if (box1.includes(i)) {
      return i;
    }
  }

  return null;
}

function findClues(selectedQuestion, allQuestions) {
  selectedQuestion = selectedQuestion.Question;
  const selectedBox = getBoxes(selectedQuestion);

  const revealedIndexes = [];

  for (const { Question: otherQuestion } of allQuestions) {
    if (otherQuestion.id === selectedQuestion.id) continue;

    const otherBox = getBoxes(otherQuestion);

    const foundIndex = findIntersectingIndex(selectedBox, otherBox);
    if (foundIndex !== null) {
      revealedIndexes.push(foundIndex);
    }
  }

  return revealedIndexes;
}

module.exports = { findClues, getBoxes, findIntersectingIndex, findIntersectingIndexes };
