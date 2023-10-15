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

  async appendArticles (articles: any) {
    
    const projectsList = await new ProjectsListModel().getProjects();
    const lastArticlesList = await new LastArticlesListModel().getLastArticlesList();
    
    const view = await /* html */`    
    <div class="container mx-auto px-4 sm:px-8">
    `
    + new LastArticlesListView().appendLastArticlesList(lastArticlesList)+
    `
    <br/>
    <br/>
    `
    + new ProjectListView().appendProjectsList(projectsList)+
    `
    </div>
    `
    return view
  }
}

export default View