import { FaTrashCan } from "react-icons/fa6";
import DrawerContext from "../../../contexts/Drawer";
import { useContext } from "react";

export default function DeleteButton({ text, game }) {
  const { openDrawer } = useContext(DrawerContext);

  function clickHandlder() {
    openDrawer("delete", game);
  }

  return (
    <>
      <button
        type="button"
        onClick={clickHandlder}
        className="inline-flex items-center px-5 py-2.5  text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
      >
        <FaTrashCan className="w-4 h-4 mr-2" />
        {text}
      </button>
    </>
  );
}
