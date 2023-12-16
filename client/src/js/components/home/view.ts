'use strict'
import ProjectsListModel from "../projects-list/model"
import ProjectListView from "../projects-list/view"
import LastArticlesListModel from "../last-articles-list/model";
import LastArticlesListView from "../last-articles-list/view";
import TagsGartenModel from "../tags-garten/model";
import TagsGartenView from "../tags-garten/view";

/**
 * View for component Home
 * @param posts
 * @returns html view for home page
 */

class View {

  async appendHome () {
    
    const projectsList = await new ProjectsListModel().getProjects();
    const lastArticlesList = await new LastArticlesListModel().getLastArticlesList();
    const tags = await new TagsGartenModel().getTags();
    
    const view = await /* html */`  
    <div class="container mx-auto px-4 sm:px-8 ml-5">    
    `
    + new LastArticlesListView().appendLastArticlesList(lastArticlesList)+
    `
    <br/>
    <br/>
    `
    + new TagsGartenView().appendTags(tags) +
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