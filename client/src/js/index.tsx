import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";
import "../styles/main.css";

const root = ReactDOM.createRoot(document.querySelector(".app") as HTMLElement);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);


//old code for version < 18
/*
const ROOT = document.querySelector(".app");

ReactDOM.render(
  <BrowserRouter basename="#/">
    <App />
  </BrowserRouter>,
  ROOT
);
*/



