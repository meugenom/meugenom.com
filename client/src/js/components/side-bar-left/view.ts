'use strict'
import TagsGartenModel from "../tags-garten/model";
import TagsGartenView from "../tags-garten/view";


/**
 * View for component SideBarLeft
 * @param posts
 * @returns html view for home page
 */

class View {

  async appendSideBarLeft () {
    const tags = await new TagsGartenModel().getTags();
    const view = await /* html */`    
          <!-- Left Sidebar (hidden on small screens) -->
          <div class="hidden lg:block w-full md:w-1/6 min-w-[300px] sidebar">
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