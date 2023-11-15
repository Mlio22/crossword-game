import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";

import "./index.css";

function checkRegistered() {
  if (!localStorage.game_token) {
    return redirect("/");
  }
}

function checkAlreadyRegistered() {
  if (localStorage.game_token) {
    const { gameSessionId } = localStorage;

    return redirect(`/${gameSessionId}`);
  }
}

function checkAdmin() {
  if (!localStorage.admin_token) {
    return redirect("/admin/login");
  }
}

function checkAlreadyAdmin() {
  if (localStorage.admin_token) {
    return redirect("/admin/");
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    // todo: ada input ID gameSession
    // todo: ada login google juga
    element: <Login type={"player"} />,
    loader: checkAlreadyRegistered,
  },
  {
    path: "/:id",
    element: <Game type={"player"} />,
    loeder: checkRegistered,
  },
  {
    path: "/admin/",
    element: <Dashboard />,
    loeder: checkAdmin,
  },

  {
    path: "/admin/login",
    element: <Login type={"admin"} />,
    loeder: checkAlreadyAdmin,
  },
  {
    path: "/admin/:id",
    element: <Game type={"admin"} />,
    loeder: checkAdmin,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
