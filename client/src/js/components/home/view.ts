'use strict'
import ProjectsListModel from "../projects-list/model"
import ProjectListView from "../projects-list/view"
import LastArticlesListModel from "../last-articles-list/model";
import LastArticlesListView from "../last-articles-list/view";

/**
 * View for component Home
 * @param posts
 * @returns html view for home page
 */

class View {

  async appendHome() {

    const projectsList = await new ProjectsListModel().getProjects();
    const lastArticlesList = await new LastArticlesListModel().getLastArticlesList();

    const view = await /* html */
      `    
          `
            + 
            await new LastArticlesListView().appendLastArticlesList(lastArticlesList) 
            
            +
          `        
          <br/>
          <br/>
          `
            + 
            await new ProjectListView().appendProjectsList(projectsList) +
          `
    `
    return view
  }
}

export default View