import AddForm from "./AddForm";
import DeleteForm from "./DeleteForm";
import UpdateForm from "./UpdateForm";

export default function Form({ name, open, closeDrawer, data }) {
  if (name === "add") return <AddForm open={open} closeDrawer={closeDrawer} />;
  if (name === "update") return <UpdateForm open={open} data={data} closeDrawer={closeDrawer} />;
  if (name === "delete") return <DeleteForm open={open} data={data} closeDrawer={closeDrawer} />;
}
