'use strict'
import Model from './model'
import View from './view'

/**
 * controller Projects-List
 * @param model
 * @param view
 * @return html to view projectsList
 */

class ProjectsList {

    model: any;
    view: any;
    projectsList: any;
    projects: any;

  constructor () {
    this.model = new Model()
    this.view = new View()
  }

  async render () {
    this.projects = await this.model.getProjects()
    this.projectsList = await this.view.appendProjectsList(this.projects)
    return this.projectsList
  }

  afterRender () { }
}

export default ProjectsList