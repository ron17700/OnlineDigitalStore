import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
import { SidePanelContext } from "./Contexts/SidePanelContext";
import { ROUTES } from "./Types/Routes";
import { SidePanelTypes } from "./Types/SidePanels";
import { SidePanel } from "./components/SidePanel/SidePanel";
import "./App.scss";
import "./styles/default-style.scss";
import "react-toastify/dist/ReactToastify.css";

export const App: React.FC = () => {
  const [activeSidePanel, setActiveSidePanel] = useState<SidePanelTypes | null>(
    null
  );
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
    <SidePanelContext.Provider
      value={{
        activeSidePanel,
        setActiveSidePanel,
      }}
    >
      <div className="App">
        <RouterProvider router={router} />
        <ToastContainer />
        <SidePanel />
      </div>
    </SidePanelContext.Provider>
  );
};
