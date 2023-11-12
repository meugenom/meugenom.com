'use strict'

/**
* Controller for component Error404
* @returns html to view error 404 then we have some error
*/

class Error404 {
  async render () {
    const view = /* html */`        
      <div class=" error-container flex items-center justify-center">            
        <div 
          class="error" 
          data-text="404">404</div>        
      </div>  
        `
    return view
  }

  afterRender () {
  }
}
export default Error404