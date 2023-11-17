import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SERVER from "../../constants";
import socket from "../../socket";
import Game from "../../components/Game";

export default function PlayerGame() {
  const { id: gameSessionId } = useParams();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState({
    title: "",
    sessionQuestions: [],
    status: "",
  });

  async function checkRegistered() {
    try {
      await axios.get(`${SERVER}/gameSession/${gameSessionId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.player_token,
        },
      });
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.game_session_id = gameSessionId;
        return navigate("/");
      }
    }
  }

  async function fetchCurrentGameSession() {
    try {
      const { data } = await axios.get(`${SERVER}/gameSession/${gameSessionId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.player_token,
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
    socket.on("refresh", () => {
      fetchCurrentGameSession();
    });

    checkRegistered();
    fetchCurrentGameSession();
  }, []);

  return (
    <>
      <div className="bg-amber-300 w-screen h-screen">
        <Game type="player" gameData={gameData} refresh={refresh} />
      </div>
    </>
  );
}
