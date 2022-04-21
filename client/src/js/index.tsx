import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";
import Footer from "./components/Footer/Footer"
import "../styles/style.scss"
import "../styles/index.css"

const ROOT = document.querySelector(".container")

ReactDOM.render((
<BrowserRouter basename="#/">
<App/>
</BrowserRouter>
), ROOT); 

const FOOTER = document.querySelector(".footer")
ReactDOM.render(<Footer/>, FOOTER)


