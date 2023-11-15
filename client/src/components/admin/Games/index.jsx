import { useState } from "react";
import Header from "./Header";
import List from "./List";
import Form from "../Form";

export default function Games() {
  const [notification, setNotification] = useState({
    status: "",
    message: "",
  });

  const [openAdd, setOpenAdd] = useState(false);
  const [isUpdated, setIsUpdated] = useState(true);

  const openDrawer = (name) => {
    setIsUpdated(false);

    if (name === "add") setOpenAdd(true);
  };

  const closeDrawer = (message) => {
    if (message?.type === "succces") {
      setIsUpdated(true);
    }

    if (message) setNotification(message);

    setOpenAdd(false);
  };

  return (
    <>
      <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
        <main>
          <Header notification={notification} openDrawer={openDrawer} />
          <List isUpdated={isUpdated} />
          <Form open={openAdd} closeDrawer={closeDrawer} name={"add"} />
        </main>
      </div>
    </>
  );
}
