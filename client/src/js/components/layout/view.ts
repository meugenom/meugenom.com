'use strict'

/**
 * View for component Layout
 * @param posts
 * @returns html view for layout page
 */

class View {

  async appendLayout () {
    const view = await /* html */`    
    <div class="h-screen overflow-hidden">
        <div class="flex justify-center items-center h-full">      
          <div class="container max-w-screen-2xl flex flex-col sm:flex-row h-full">    
            
            <!-- Left Sidebar -->
            <div id="side-bar-left" class="flex-shrink-0"></div>

            <!-- Main Content (takes full width on small screens)-->
            <div id="page" class="w-full lg:w-4/6 min-w-[660px] overflow-y-auto h-full border-r border-l border-gray-300 px-5"></div>
            
            <!-- Right Sidebar -->
            <div id="side-bar-right" class="flex-shrink-0"></div>

          </div>
        </div>
    </div>
    ` 
    return view
  }

}

export default View