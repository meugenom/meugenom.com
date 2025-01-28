'use strict'

import TagsGartenModel from "../tags-garten/model";
import TagsGartenView from "../tags-garten/view";

/**
 * View for component SideBarRight
 * @param posts
 * @returns html view for home page
 */

class View {
  
  async appendSideBarRight () {
    const tags = await new TagsGartenModel().getTags();
    const view = await /* html */`    
        <div class="hidden lg:block w-full min-w-[300] max-w-[300] sidebar">
          `
          +            
            await new TagsGartenView().appendTags(tags)
          +
        `
        </div>
    ` 
    return view
  }

}

export default View