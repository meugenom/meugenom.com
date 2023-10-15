'use strict'
/**
* Controller for component Error404
* @returns html to view error 404 then we have some error
*/

class Error404 {
  async render () {
    const view = /* html */`        
      <div class="flex items-center justify-center">            
        <img src="../../../images/404.svg" alt="404-error" class="w-120 h-80" />          
      </div>  
        `
    return view
  }

  afterRender () {
  }
}
export default Error404