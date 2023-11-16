import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SERVER from "../../constants";

export default function PlayerGame() {
  const { id: gameSessionId } = useParams();
  const navigate = useNavigate();

  async function checkRegistered() {
    try {
      const { data } = await axios.get(`${SERVER}/gameSession/${gameSessionId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.player_token,
        },
      });

      console.log(data);
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.game_session_id = gameSessionId
        return navigate("/");
      }
    }
  }

  useEffect(() => {
    checkRegistered();
  });

  return <></>;
}
