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
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Product } from "./DataModel/Objects/Product";
import { ProductsContext } from "./Contexts/ProductsContext";
import { PermissionsContext } from "./Contexts/Permissionscontext";
import "./styles/default-style.scss";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { AdminRoute } from "./components/AdminRoute/AdminRoute";

const libraries: Libraries = ["places"];

const router = createBrowserRouter([
  {
    path: `/${ROUTES.HOME}`,
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${ROUTES.ADMIN}`,
    element: (
      <AdminRoute>
        <AdminPanel />
      </AdminRoute>
    ),
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

  const [generalPageProducts, setGeneralPageProducts] = useState<Product[]>([]);
  const [isLoadingGeneralPageProducts, setIsLoadingGeneralPageProducts] =
    useState(false);
  const [permissions, setPermissions] = useState<string[] | undefined>(
    undefined
  );

  const sidePaneContextValue = useMemo(() => {
    return {
      setActiveSidePanel,
    };
  }, []);

  const productsContextValue = useMemo(() => {
    return {
      products: generalPageProducts,
      setProducts: setGeneralPageProducts,
      isLoading: isLoadingGeneralPageProducts,
      setIsLoading: setIsLoadingGeneralPageProducts,
    };
  }, [
    generalPageProducts,
    setGeneralPageProducts,
    isLoadingGeneralPageProducts,
    setIsLoadingGeneralPageProducts,
  ]);

  const permissionsContextValue = useMemo(() => {
    return {
      permissions,
      setPermissions,
    };
  }, [permissions, setPermissions]);

  return (
    <LoadScript
      googleMapsApiKey={"AIzaSyB4CW2Nb9m9IVvfM-11LekgWIYKvlyHSwk"}
      libraries={libraries}
    >
      <PermissionsContext.Provider value={permissionsContextValue}>
        <ProductsContext.Provider value={productsContextValue}>
          <SidePanelContext.Provider value={sidePaneContextValue}>
            <div className="App">
              <RouterProvider router={router} />
              <ToastContainer />
              <SidePanel activeSidePanel={activeSidePanel} />
            </div>
          </SidePanelContext.Provider>
        </ProductsContext.Provider>
      </PermissionsContext.Provider>
    </LoadScript>
  );
};
