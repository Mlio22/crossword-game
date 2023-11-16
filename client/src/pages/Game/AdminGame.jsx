import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SERVER from "../../constants";
import Game from "../../components/Game";

export default function AdminGame() {
  const { id: gameSessionId } = useParams();

  const [gameData, setGameData] = useState({
    title: "",
    sessionQuestions: [],
    link: "",
    status: "",
  });

  async function fetchCurrentGameSession() {
    try {
      const { data } = await axios.get(`${SERVER}/admin/gameSession/${gameSessionId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.admin_token,
        },
      });

      setGameData(data);
    } catch (error) {
      console.log(error);
    }
  }

  function refresh() {
    fetchCurrentGameSession();
  }

  useEffect(() => {
    fetchCurrentGameSession();
  }, []);

  return (
    <>
      <div className="bg-amber-300 w-screen h-screen">
        <Game type="admin" gameData={gameData} refresh={refresh} />
      </div>
    </>
  );
}
