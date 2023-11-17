import AdminLogin from "./AdminLogin";
import PlayerLogin from "./PlayerLogin";

export default function Login({ type }) {
  if (type === "player") return <PlayerLogin />;
  if (type === "admin") return <AdminLogin />;
}
