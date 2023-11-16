import axios from "axios";
import Button from "../Button";
import SERVER from "../../../constants";
import { useNavigate } from "react-router-dom";

export default function Item({ game, openDrawer }) {
  const navigate = useNavigate();

  async function handleOpen() {
    console.log(game);

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
      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
          <div className="text-base font-semibold text-gray-900 dark:text-white">{game.title}</div>
        </td>
        <td className="p-4 space-x-2 whitespace-nowrap">
          <Button openDrawer={() => handleOpen()} name={"openButton"} text={"Open Session"} />
          <Button openDrawer={() => openDrawer("update", game)} name={"updateButton"} text={"Update Game"} />
          <Button openDrawer={() => openDrawer("delete", game)} name={"deleteButton"} text={"Delete Game"} />
        </td>
      </tr>
    </>
  );
}
