import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import "./App.scss";
import "./styles/default-style.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ROUTES = {
  HOME: "",
  LOGIN: "login",
} as const;

export type Routes = (typeof ROUTES)[keyof typeof ROUTES];

export const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: `/${ROUTES.HOME}`,
      element: <Home />,
    },
    {
      path: `/${ROUTES.LOGIN}`,
      element: <Login />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};
