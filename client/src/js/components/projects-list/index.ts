'use strict'
import IProject from '../interfaces/IProject';
import Model from './model'
import View from './view'

/**
 * controller Projects-List
 * @param model
 * @param view
 * @return html to view projectsList
 */

class ProjectsList {

    model: Model;
    view: View;
    section: string;
    projects: IProject[];

  constructor () {
    this.model = new Model()
    this.view = new View()
  }

  async render () {
    this.projects = await this.model.getProjects()
    this.section = await this.view.appendProjectsList(this.projects)
    return this.section
  }

  afterRender () { 
    //     
  }
}

export default ProjectsList