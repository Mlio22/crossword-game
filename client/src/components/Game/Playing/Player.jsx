import axios from "axios";
import SERVER from "../../../constants";
import { useParams } from "react-router-dom";

// todo: tertimpa  kosong
function Box({ data }) {
  const [letter, id, isFirst, initialRevealed] = data;
  const { id: gameSessionId } = useParams();

  const filled = letter ? "border bg-white hover:bg-gray-100" : "";

  async function handleClick() {
    const answer = prompt("Jawaban anda adalah....");

    if (answer) {
      try {
        await axios.post(
          `${SERVER}/gameSession/${gameSessionId}/${id}`,
          {
            answer,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.player_token,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <div className="relative">
        {isFirst && (
          <div className="absolute rounded-lg w-5 h-5 flex justify-center items-center text-xs bg-gray-600 text-white text-center -left-1 -top-1">
            {id}
          </div>
        )}
        <div className={`box ${filled} flex justify-center`} style={{ aspectRatio: 1 }}>
          {letter && (
            <button className="w-full" onClick={handleClick}>
              {initialRevealed && letter}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function generateBoxes(questions) {
  // https://stackoverflow.com/a/38213067/12125511
  let letters = [...Array(12)].map((_) => [...Array(12)].map((_) => Array(4)));

  for (const { Question, SolverPlayerId, SessionQuestionId: id } of questions) {
    const { word, startCoordinateX, startCoordinateY, direction } = Question;

    let x = startCoordinateX - 1;
    let y = startCoordinateY - 1;

    for (let i = 0; i < word.length; i++) {
      const letter = word[i];

      // todo: bug dimana 2 soal yang mengambil posisi yang sama
      letters[y][x] = [letter, id, !i, SolverPlayerId];

      if (direction === "straightward") x += 1;
      if (direction === "downward") y += 1;
    }
  }

  let gameBoxes = [];

  for (let i = 0; i < 12; i++) {
    const boxRow = [];

    for (let j = 0; j < 12; j++) {
      boxRow.push(<Box data={letters[i][j]} />);
    }

    gameBoxes.push(boxRow);
  }

  const element = (
    <div id="gameBox" className="border p-4 grid grid-flow-row">
      {gameBoxes.map((rowBoxes, idx) => {
        return (
          <div className={`grid grid-cols-${rowBoxes.length}`} style={{ gridTemplateColumns: `repeat(${rowBoxes.length}, minmax(0, 1fr))` }}>
            {rowBoxes.map((box, idx) => box)}
          </div>
        );
      })}
    </div>
  );

  return { gameBoxes, element };
}

export default function Player({ gameData }) {
  let { sessionQuestions: questions } = gameData;

  questions = questions.map((question) => {
    const { Question, SolverPlayerId, id } = question;

    question = { Question, SolverPlayerId, SessionQuestionId: id };
    return question;
  });

  let straightwardHints = [];
  let downwardHints = [];

  questions.forEach(({ Question, SolverPlayerId, SessionQuestionId: id }) => {
    const { hint, direction } = Question;

    if (direction === "straightward") straightwardHints.push([`${id}. ${hint}`, SolverPlayerId]);
    if (direction === "downward") downwardHints.push([`${id}. ${hint}`, SolverPlayerId]);
  });

  const generatedBoxes = generateBoxes(questions);

  return (
    <>
      <div className="w-screen p-4 h-screen">
        <div className="flex">
          <div id="game" className="w-4/12 max-h-1/2  m-auto">
            {generatedBoxes.element}
          </div>
          <div id="cluesContainer" className="w-4/12 border p-4">
            <p className="text-center text-lg font-bold">Clues</p>

            <p className="font-semibold">Lurus</p>
            <div className="straighward mt-2 h-60 overflow-auto">
              <ul>
                {straightwardHints.map((hint, idx) => {
                  const [hintText, solved] = hint;

                  if (solved)
                    return (
                      <li className="line-through" key={idx}>
                        {hintText}
                      </li>
                    );

                  return <li key={idx}>{hintText}</li>;
                })}
              </ul>
            </div>
            <hr class="w-54 h-0.5 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-700"></hr>

            <p className="font-semibold">Menurun</p>
            <div className="downward h-60 mt-2 overflow-auto">
              <ul>
                {downwardHints.map((hint, idx) => {
                  const [hintText, solved] = hint;

                  if (solved) {
                    return (
                      <li className="line-through" key={idx}>
                        {hintText}
                      </li>
                    );
                  }

                  return <li key={idx}>{hintText}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
