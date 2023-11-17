import { useEffect, useState } from "react";
import GoogleLogin from "../../components/player/GoogleLogin";
import GameSessionInput from "../../components/player/GameSessionInput";
import GameSignup from "../../components/player/GameSignup";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import SERVER from "../../constants";
import { useNavigate } from "react-router-dom";

export default function PlayerLogin() {
  const navigate = useNavigate();

  const [content, setContent] = useState(<></>);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  async function googleLoginHandler(response) {
    if (!isLoading) {
      setMessage("Logging in");
      setIsLoading(true);

      try {
        const { credential } = response;

        const {
          data: { access_token },
        } = await axios.post(`${SERVER}/login`, {
          google_token: credential,
        });

        localStorage.player_token = access_token;

        setMessage("");
        setIsChanging(!isChanging);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function gameSessionInputHandler(gameSessionId) {
    if (!isLoading) {
      setMessage("Checking Session...");
      setIsLoading(true);

      try {
        await axios.get(`${SERVER}/checkSession/${gameSessionId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.player_token,
          },
        });

        localStorage.game_session_id = gameSessionId;
        setIsChanging(!isChanging);
        setMessage("");
      } catch (error) {
        const {
          status,
          data: { message },
        } = error?.response;

        console.log(error);

        if (status === 404) {
          setMessage(message);
        } else {
          setMessage("Error just happened");
        }
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function signupHandler(username) {
    if (!isLoading) {
      setMessage("Checking username");
      setIsLoading(true);

      try {
        await axios.post(
          `${SERVER}/signup`,
          {
            username,
            gameSessionId: localStorage.game_session_id,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.player_token,
            },
          }
        );

        setMessage("");
        return navigate(`/${localStorage.game_session_id}`)
      } catch (error) {
        const message = error?.response?.data?.message;

        console.log(message);

        if (message) {
          setMessage(message);
        }
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function checkInformations() {
    const { player_token, game_session_id } = localStorage;

    if (!player_token) {
      return setContent(<GoogleLogin handler={googleLoginHandler} />);
    }

    if (!game_session_id) {
      return setContent(<GameSessionInput handler={gameSessionInputHandler} />);
    }

    // todo: cek registrasi
    try {
      await axios.get(`${SERVER}/gameSession/${game_session_id}`, {
        headers: {
          Authorization: "Bearer " + player_token,
        },
      });

      // redirect ke game
      navigate(`/${game_session_id}`);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message === "Not registered") {
        return setContent(<GameSignup handler={signupHandler} />);
      }
    }
  }

  useEffect(() => {
    checkInformations();
  }, [isChanging]);

  return (
    <>
      <div className="bg-amber-300 w-screen h-screen flex justify-center items-center">
        <div className="container bg-orange-500 max-w-sm rounded-md">
          <div className="logo flex items-center justify-center">
            <img src="./logo/light.png" className="w-20" alt="" />
            <p className="text-lg font-serif">Crossword Game</p>
          </div>

          <div className="flex justify-center items-center">
            <p className="mr-2">{message} </p>
            {isLoading && <Spinner className="w-4" />}
          </div>
          <div className="content p-3">{content}</div>
        </div>
      </div>
    </>
  );
}
