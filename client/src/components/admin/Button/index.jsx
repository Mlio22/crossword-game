import AddButton from "./AddButton";
import DeleteButton from "./DeleteButton";
import OpenButton from "./OpenButton";
import UpdateButton from "./UpdateButton";

export default function Button({ name, text, openDrawer }) {
  if (name === "addButton") return <AddButton openDrawer={openDrawer} text={text} />;
  if (name === "openButton") return <OpenButton openDrawer={openDrawer} text={text} />;
  if (name === "updateButton") return <UpdateButton openDrawer={openDrawer} text={text} />;
  if (name === "deleteButton") return <DeleteButton openDrawer={openDrawer} text={text} />;
}
