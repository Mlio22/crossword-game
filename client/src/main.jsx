import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";

import "./index.css";
import Login from "./pages/Login";
import Game from "./pages/Game";
import Dashboard from "./pages/Dashboard";

function checkRegistered() {
  if (!localStorage.game_token) {
    return redirect("/");
  }

  return null;
}

function checkAlreadyRegistered() {
  if (localStorage.game_token) {
    const { gameSessionId } = localStorage;

    return redirect(`/${gameSessionId}`);
  }
  return null;
}

function checkAdmin() {
  if (!localStorage.admin_token) {
    return redirect("/admin/login");
  }
  return null;
}

function checkAlreadyAdmin() {
  if (localStorage.admin_token) {
    return redirect("/admin/");
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Dashboard />,
    loader: checkAdmin,
  },
  {
    path: "/admin/login",
    element: <Login type={"admin"} />,
    loader: checkAlreadyAdmin,
  },
  {
    path: "/admin/:id",
    element: <Game type={"admin"} />,
    loader: checkAdmin,
  },
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
    loader: checkRegistered,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
