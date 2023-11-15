import AddForm from "./AddForm";

export default function Form({ name, open, closeDrawer, data }) {
  if (name === "add") return <AddForm open={open} closeDrawer={closeDrawer} />;
}
