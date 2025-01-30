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

  async appendPage() {
    
    const view = await /* html */
      `    
        <div class="items-center justify-center mt-20">          
            <div 
                class="error" 
                data-text="502">
                502
            </div>        
      </div>  
    `
    return view
  }
}

export default View