import Admin from "./Admin";
import Player from "./Player";

export default function Playing({ type, gameData, refresh }) {
  if (type === "admin") return <Admin gameData={gameData} refresh={refresh} />;
  if (type === "player") return <Player gameData={gameData} refresh={refresh} />;
}
