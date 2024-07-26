import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-dkqfydoceubyxu30.us.auth0.com"
      clientId="nugjipUQ5ojLab9HQXzDzfQBkDEF0ZF1"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://online-store-cs",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
