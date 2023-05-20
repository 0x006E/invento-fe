import dayjs from "dayjs";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

dayjs.locale("en-in");
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
