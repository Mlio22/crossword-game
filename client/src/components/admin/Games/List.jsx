import { useEffect, useState } from "react";
import axios from "axios";
import SERVER from "../../../constants";
import Item from "./Item";

export default function List() {
  const [games, setGames] = useState([]);

  async function fetchGames() {
    const { data } = await axios.get(`${SERVER}/admin/games`, {
      headers: {
        Authorization: "Bearer " + localStorage.admin_token,
      },
    });

    setGames(data.data);
  }

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <>
      <div className="flex flex-col mt-28">
        <div className="overflow-x-auto mt-3">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Title
                    </th>
                    <th scope="cl" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {games.map((game) => {
                    return <Item key={game.id} game={game} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
