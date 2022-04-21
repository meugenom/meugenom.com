import * as React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "../Home/Home";
import ArticlesList from "../ArticlesList/ArticlesList";
import ProjectsList from "../ProjectsList/ProjectsList";
import About from "../About/About";
import Article from "../Article/Article";
import Error404 from "../Error404/Error404";
import Nav from "../Nav/Nav";

export default function App() {
  const routs = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/articles",
      name: "Articles",
    },
    {
      link: "/projects",
      name: "Pets",
    },
    {
      link: "/about",
      name: "About",
    },
  ];

  const content = "ohh another prop this is good!!";
  return (
    <React.Fragment>
      <Nav routs={routs} />
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path="/articles" component={ArticlesList} />
        <Route path="/projects" component={ProjectsList} />
        <Route path="/about" component={About} />
        <Route path="/article/:slug" component={Article} />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
}
