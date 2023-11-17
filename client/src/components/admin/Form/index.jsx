import AddForm from "./AddForm";
import DeleteForm from "./DeleteForm";
import UpdateForm from "./UpdateForm";

export default function Form({ name, data }) {
  if (name === "add") return <AddForm />;
  if (name === "update") return <UpdateForm data={data} />;
  if (name === "delete") return <DeleteForm data={data} />;
}
