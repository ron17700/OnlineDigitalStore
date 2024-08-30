import React, { useMemo, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
import { SidePanelContext } from "./Contexts/SidePanelContext";
import { ROUTES } from "./Types/Routes";
import { SidePanelTypes } from "./Types/SidePanels";
import { SidePanel } from "./components/SidePanel/SidePanel";
import { AdminPanel } from "./pages/AdminPanel/AdminPanel";
import { Libraries, LoadScript } from "@react-google-maps/api";
import "./App.scss";
import "./styles/default-style.scss";
import "react-toastify/dist/ReactToastify.css";

const libraries: Libraries = ["places"];

const router = createBrowserRouter([
  {
    path: `/${ROUTES.HOME}`,
    element: <Home />,
  },
  {
    path: `/${ROUTES.ADMIN}`,
    element: <AdminPanel />,
  },
  {
    path: `/${ROUTES.LOGIN}`,
    element: <Login />,
  },
]);

export const App: React.FC = () => {
  const [activeSidePanel, setActiveSidePanel] = useState<SidePanelTypes | null>(
    null
  );

  const sidePaneContextValue = useMemo(() => {
    return {
      setActiveSidePanel,
    };
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={"AIzaSyB4CW2Nb9m9IVvfM-11LekgWIYKvlyHSwk"}
      libraries={libraries}
    >
      <SidePanelContext.Provider value={sidePaneContextValue}>
        <div className="App">
          <RouterProvider router={router} />
          <ToastContainer />
          <SidePanel activeSidePanel={activeSidePanel} />
        </div>
      </SidePanelContext.Provider>
    </LoadScript>
  );
};
