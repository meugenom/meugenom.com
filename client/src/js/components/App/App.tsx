import * as React from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import Home from "../Home/Home";
import ArticlesList from "../ArticlesList/ArticlesList";
import ProjectsList from "../ProjectsList/ProjectsList";
import Article from "../Article/Article";
import Error404 from "../Error404/Error404";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

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
  ];
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <React.Fragment>
      <div>
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gradient-to-r from-slate-400 to-slate-200 border-gray-600 shadow-md shadow-slate-500/10 mb-3">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
              <a href="https://meugenom.com" className="flex items-center">
                <img
                  src="../../images/brain_gray.svg"
                  alt="face-splash"
                  className="mr-3 h-6 sm:h-9"
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  <span className="text-yellow-500">Meu</span>
                  <span className="text-sky-500">Genom</span>
                </span>
              </a>
              <button
                type="button"
                onClick={() => setNavbarOpen(!navbarOpen)}
                data-collapse-toggle="mobile-menu-3"
                className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-3"
                aria-expanded="false"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>

                <i className="fas fa-bars"></i>
              </button>
            </div>
            <div
              className={
                "lg:flex flex-grow items-center" +
                (navbarOpen ? " flex" : " hidden")
              }
              id="example-navbar-danger"
            >
              <Nav routs={routs} />
            </div>
          </div>
        </nav>
      </div>
      <div
        className="md:container 
					mx-10 
					font-sans 
	  				text-base 
					antialiased 
					leading-7 
					z-0"
      >
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/projects" element={<ProjectsList />} />

          <Route path="/article/:slug" element={<Article/>}/>

          <Route element={<Error404 />}></Route>
        </Routes>
      </div>

      <Footer />
    </React.Fragment>
  );
}
