import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SERVER from "../../../constants";

export default function Admin({}) {
  const { id } = useParams();

  const [result, setResult] = useState(null);

  async function fetchResult() {
    const { data } = await axios.get(`${SERVER}/admin/gameSession/${id}/result`, {
      headers: {
        Authorization: "Bearer " + localStorage.admin_token,
      },
    });

    setResult(data);
  }

  useEffect(() => {
    fetchResult();
  }, []);

  if (!result) {
    return <>Loading Data</>;
  }

  return (
    <>
      <div className="w-screen py-10 px-20">
        <p className="font-bold text-3xl font-sans text-center mb-10">Summary</p>
        <div className="flex flex-1 justify-center items-stretch">
          <div className="blueTeam relative bg-blue-500 w-1/2 p-4 mr-2">
            <p className="font-bold mb-2 text-xl">Blue Team</p>
            <ul className="mb-20">
              {result.data.blue.players.map((player, idx) => {
                return <li key={idx}>{player}</li>;
              })}
            </ul>

            <div className="score bottom-4 absolute left-1/2 -translate-x-1/2 font-bold text-5xl">{result.data.blue.score}</div>
          </div>
          <div class="inline-block  min-h-[1em] w-1.5 self-stretch bg-black opacity-100 dark:opacity-50"></div>
          <div className="blueTeam relative bg-red-500 w-1/2 p-4 ml-2">
            <p className="font-bold mb-2 text-xl">Red Team</p>
            <ul className="mb-20 max-h-80 overflow-auto">
            {result.data.red.players.map((player, idx) => {
                return <li key={idx}>{player}</li>;
              })}
            </ul>

            <div className="score bottom-4 absolute left-1/2 -translate-x-1/2 font-bold text-5xl">{result.data.blue.score}</div>
          </div>
        </div>

        <div className="flex items-center w-40 m-auto mt-4 justify-center">
          <button onClick={""} className="bg-orange-400 hover:bg-orange-500 w-full rounded-lg p-3 text-center">
            End Game
          </button>
        </div>
      </div>
    </>
  );
}
