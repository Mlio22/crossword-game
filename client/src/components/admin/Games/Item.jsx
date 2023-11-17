import Button from "../Button";

export default function Item({ game }) {
  return (
    <>
      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
          <div className="text-base font-semibold text-gray-900 dark:text-white">{game.title}</div>
        </td>
        <td className="p-4 space-x-2 whitespace-nowrap">
          <Button game={game} name={"openButton"} text={"Open Session"} />
          <Button game={game} name={"updateButton"} text={"Update Game"} />
          <Button game={game} name={"deleteButton"} text={"Delete Game"} />
        </td>
      </tr>
    </>
  );
}
