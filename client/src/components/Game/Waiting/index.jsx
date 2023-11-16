import Admin from "./Admin";
import Player from "./Player";

export default function Waiting({ type, gameData, refresh }) {
  return <>
    {type === "admin" && <Admin gameData={gameData} refresh={refresh} />}
    {type === "player" && <Player gameData={gameData} refresh={refresh} />}
  </>;
}
