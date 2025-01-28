'use strict'

/**
 * View for component SideBarRight
 * @param posts
 * @returns html view for home page
 */

class View {

  async appendSideBarRight () {

    const view = await /* html */`    
        <div class="hidden lg:block w-full md:w-1/6 min-w-[300] sidebar">
          `
          +
            "Sidebar right"
          +
        `
        </div>
    ` 
    return view
  }

}

export default View