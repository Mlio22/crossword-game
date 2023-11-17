import AdminGame from "./AdminGame";
import PlayerGame from "./PlayerGame";

export default function Game({ type }) {
  if (type === "player") return <PlayerGame />;
  if (type === "admin") return <AdminGame />;
}
