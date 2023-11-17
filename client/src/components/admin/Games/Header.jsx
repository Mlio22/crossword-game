import Button from "../Button";
import Toast from "../Toast";

export default function Header({ notification }) {
  return (
    <>
      <div className="p-4 mt-16 fixed top-0 w-full bg-white block sm:flex items-center justify-between border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All Games</h1>
          </div>
          <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
            <Button name={"addButton"} text={"Add Game (s)"} />
          </div>
        </div>
        {notification && <Toast name={notification.type} text={notification.text} />}
      </div>
    </>
  );
}
