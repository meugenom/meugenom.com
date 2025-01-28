'use strict'

/**
* Controller for component Error500
* @returns html to view error 500 then we have some error
*/

class Error500 {
  async render () {
    const view = /* html */`        
       <div class="items-center justify-center mt-20">            
      <div 
      class="error" 
      data-text="500">
      500
    </div>        
      </div>  
        `
    return view
  }

  afterRender () {
  }
}
export default Error500