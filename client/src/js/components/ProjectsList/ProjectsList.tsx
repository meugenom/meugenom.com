import * as React from "react";

import Config from "./../../Config";
import Query from "./../Service/Query";
import Service from "../Service/Service";
//import "./Cards.scss";

interface IProps {}

interface IState {
  projectsList: IProject[];
  projectsFilter: IProject[];
}

interface IIssue {
  id: string;
  number: number;
  lastEditedAt: Date;
  bodyText: string;
}

interface ILang {
  name: string;
}

interface IRepositoryTopic {
  node: {
    topic: {
      name: string;
    };
  };
}

interface IProject {
  node: {
    id: string;
    name: string;
    description: string;
    updatedAt: string;
    createdAt: string;
    hasIssuesEnabled: boolean;
    homepageUrl: string;
    resourcePath: string;
    openGraphImageUrl: string;
    repositoryTopics: {
      edges: IRepositoryTopic[];
    };
    issues: {
      nodes: IIssue[];
    };
    languages: {
      nodes: ILang[];
    };
  };
}

export default class ProjectsList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { projectsList: [], projectsFilter: [] };
    this.getProjects();
  }

  async getProjects() {
    const token = Config.token;
    const host = Query.projectsList.host;
    const query = Query.projectsList.query;
    const variables = {};
    const dataType = "json";
    const response = await new Service().graphql(
      dataType,
      token,
      host,
      query,
      variables
    );
    const projects = await response.user.repositories.edges;
    const projectsWithDescription = await projects.filter(
      (project: IProject) => String(project.node.description) !== "null"
    );
    this.setState({ projectsList: projectsWithDescription });
  }

  openWebPage(event: React.MouseEvent, link: string) {
    event.preventDefault();
    window.open(link);
  }

  getMonth(num: number) {
    return Config.months[num];
  }

  renderLanguages(project: IProject) {
    const languagePosition = {
      right: 0,
    };

    return project.node.languages.nodes.map((language: ILang) => {
      return (
        <div className="relative">
          <button
            className="absolute border border-slate-400 bg-slate-400 text-white  text-sm px-2 py-0 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            style={languagePosition}
          >
            {language.name}
          </button>
          <br />
        </div>
      );
    });
  }

  renderProjectsList() {
    return this.state.projectsList.map((project: IProject, id: number) => {
      //project.node.languages.nodes.map((language: ILang) => {
      //console.log(language.name);
      // })

      const languagePosition = {
        top: 0,
        right: 0,
      };

	  const card = {
		height: "430px",
		width: "302px"
	}

      return (
        <div>
          <div
            key={project.node.id}
            className="shadow-lg hover:shadow-md bg-white rounded-lg overflow-hidden relative"
			style = {card}
          >
            <img
              className="object-cover w-full h-48 w-70max-w-70 min-w-70"
              src={project.node.openGraphImageUrl}
              alt="project_picture"
            />

            <div className="absolute mt-1" style={languagePosition}>
              {this.renderLanguages(project)}
            </div>

            <div className="relative p-4 h-60 max-h-60">
              <h3 className="text-base md:text-xl font-medium text-gray-800">
                {project.node.name}
              </h3>

              <p className="mt-4 text-base md:text-xs text-gray-600">
                (updated {new Date(project.node.updatedAt).getDate()}.
                {this.getMonth(new Date(project.node.updatedAt).getMonth())}.
                {new Date(project.node.updatedAt).getFullYear()})
              </p>
              <p>
                <a
                  className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-yellow-400  hover:bg-yellow-500 uppercase last:mr-0 mr-1"
                  href="#"
                  onClick={(e) => {
                    this.openWebPage(
                      e,
                      "https://github.com" + project.node.resourcePath
                    );
                  }}
                >
                Code
                </a>
                &nbsp;
                {project.node.homepageUrl === "" ||
                project.node.homepageUrl == null ? (
                  ""
                ) : (
                  <a
                    className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-400  hover:bg-blue-500 uppercase last:mr-0 mr-1"
                    href="#"
                    onClick={(e) => {
                      this.openWebPage(e, project.node.homepageUrl);
                    }}
                  >
                    Show
                  </a>
                )}
              </p>
              <p className="mt-2 text-base md:text-sx text-gray-600">
                {project.node.description}
              </p>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container mb-20">
        <article>
          <h4 className="text-2xl font-normal leading-normal mt-0 mb-2 text-gray-500">
            Pet Projects:
          </h4>
          <ul className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full mt-10">
            {this.renderProjectsList()}
          </ul>
        </article>
      </div>
    );
  }
}
