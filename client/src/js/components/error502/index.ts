'use strict'

/**
* Controller for component Error502
* @returns html to view error 502 then we have some error
*/

class Error502 {
  async render () {
    const view = /* html */`        
      <div class=" error-container flex items-center justify-center">            
        <div class="error w-120 h-80" title="502">502</div>
      </div>  
        `
    return view
  }

  afterRender () {
  }
}
export default Error502