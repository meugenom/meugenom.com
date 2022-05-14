import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";
import "../styles/main.css";

const ROOT = document.querySelector(".app");

ReactDOM.render(
  <BrowserRouter basename="#/">
    <App />
  </BrowserRouter>,
  ROOT
);
