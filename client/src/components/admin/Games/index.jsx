import { useState } from "react";
import Header from "./Header";
import List from "./List";

export default function Games() {
  const [notification, setNotification] = useState({
    status: "",
    message: "",
  });

  return (
    <>
      <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
        <main>
          <Header notification={notification} />
          <List />
        </main>
      </div>
    </>
  );
}
