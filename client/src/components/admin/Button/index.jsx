import AddButton from "./AddButton";
import DeleteButton from "./DeleteButton";
import OpenButton from "./OpenButton";
import UpdateButton from "./UpdateButton";

export default function Button({ name, text, game }) {
  if (name === "addButton") return <AddButton text={text} />;
  if (name === "openButton") return <OpenButton game={game} text={text} />;
  if (name === "updateButton") return <UpdateButton game={game} text={text} />;
  if (name === "deleteButton") return <DeleteButton game={game} text={text} />;
}
