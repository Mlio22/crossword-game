import { IoGameController } from "react-icons/io5";
import axios from "axios";
import SERVER from "../../../constants";
import { useNavigate } from "react-router-dom";

export default function OpenButton({ text, game }) {
  const navigate = useNavigate();

  async function clickHandlder() {
    try {
      const { data } = await axios.get(`${SERVER}/admin/games/${game.id}/open`, {
        headers: {
          Authorization: "Bearer " + localStorage.admin_token,
        },
      });

      const openedGameSessionId = data.id;
      return navigate(`/admin/${openedGameSessionId}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button
        onClick={clickHandlder}
        className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        type="button"
      >
        <IoGameController className="w-4 h-4 mr-2" />
        {text}
      </button>
    </>
  );
}
