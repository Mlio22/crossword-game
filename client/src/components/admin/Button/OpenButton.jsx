import { useContext } from "react";
import { IoGameController } from "react-icons/io5";
import DrawerContext from "../../../contexts/Drawer";

export default function OpenButton({ text, game }) {
  const { openDrawer } = useContext(DrawerContext);

  function clickHandlder() {
    openDrawer();
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
