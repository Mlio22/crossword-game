import { FaPlus } from "react-icons/fa6";

export default function AddButton({ text, openDrawer }) {
  return (
    <>
      <button
        onClick={openDrawer}
        className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        type="button"
      >
        <FaPlus className="w-4 mr-2 mt-1" />
        {text}
      </button>
    </>
  );
}
