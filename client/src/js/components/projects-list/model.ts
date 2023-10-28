'use strict'
import Service from '../services/services';
import Config from "../../config";
import Query from "../services/query";
import IProject from "../interfaces/IProject";

/**
 * Model for component Project List
 * @returns list of projects
 */


class Model {

    projects: IProject[];

    constructor () {
        this.projects = []
    }

    async getProjects () {            
            const token = process.env.GITHUB_TOKEN;
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
            
            return projectsWithDescription;
    }

    getMonth(num: number) {
      return Config.months[num];
    }
}

export default Model