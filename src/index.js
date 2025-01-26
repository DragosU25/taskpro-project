import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import WebFont from "webfontloader";
import { Provider } from "react-redux";
import store from "./store/index";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "modern-normalize/modern-normalize.css";
import "react-datepicker/dist/react-datepicker.css";

WebFont.load({
  google: {
    families: ["Poppins:400,500,600", "sans-serif"],
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter basename="/">
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
