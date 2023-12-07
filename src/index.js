import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";

const root = document.getElementById("root");

const createRoot = (element) => {
  if (root !== null) {
    return ReactDOM.createRoot(root).render(element);
  }
};

const render = () => {
  const App = require("./App").default;
  createRoot(
    <React.StrictMode>
      {" "}
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
};

if (module.hot) {
  module.hot.accept("./App", render);
}

render();
