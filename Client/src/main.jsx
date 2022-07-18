import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter} from "react-router-dom";
import { App } from "./App";
import { Auth0Provider } from '@auth0/auth0-react';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Auth0Provider
        domain="dev-f0cvoxdz.us.auth0.com"
        clientId="ANnuta1KITj5uSu9Wd7npe2uGecEtyX6"
        redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
