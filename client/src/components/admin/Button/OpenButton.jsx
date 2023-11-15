import { IoGameController } from "react-icons/io5";

export default function OpenButton({ text }) {
  return (
    <>
      <button
        className="inline-flex items-center px-3 py-2 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        type="button"
      >
        <IoGameController className="w-4 h-4 mr-2" />
        {text}
      </button>
    </>
  );
}
