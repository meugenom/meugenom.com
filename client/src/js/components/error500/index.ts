'use strict'

/**
* Controller for component Error500
* @returns html to view error 500 then we have some error
*/

class Error500 {
  async render () {
    const view = /* html */`        
      <div class=" error-container flex items-center justify-center">            
        <div class="error w-120 h-80" title="500">500</div>
      </div>  
        `
    return view
  }

  afterRender () {
  }
}
export default Error500