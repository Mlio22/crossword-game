import { useContext, useState } from "react";
import Header from "./Header";
import List from "./List";
import Form from "../Form";
import DrawerContext from "../../../contexts/Drawer";

export default function Games() {
  const [notification, setNotification] = useState({
    status: "asmdlksakldm",
    text: "askmdlaksdlkm",
  });

  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isUpdated, setIsUpdated] = useState(true);

  const [currentData, setCurrentData] = useState({});

  const openDrawer = (name, data) => {
    if (data) setCurrentData(data);

    setIsUpdated(false);

    if (name === "add") setOpenAdd(true);
    if (name === "update") setOpenUpdate(true);
    if (name === "delete") setOpenDelete(true);
  };

  const closeDrawer = (message) => {
    if (message?.type === "success") setIsUpdated(true);
    if (message) setNotification(message);

    setOpenAdd(false);
    setOpenUpdate(false);
    setOpenDelete(false);
  };

  return (
    <>
      <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
        <main>
          <DrawerContext.Provider value={{ openAdd, openUpdate, openDelete, openDrawer, closeDrawer }}>
            <Header notification={notification} />
            <List isUpdated={isUpdated} />
            <Form name={"add"} />
            <Form data={currentData} name={"update"} />
            <Form data={currentData} name={"delete"} />
          </DrawerContext.Provider>
        </main>
      </div>
    </>
  );
}
