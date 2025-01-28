'use strict'

/**
* Controller for component Error404
* @returns html to view error 404 then we have some error
*/

class Error404 {

  constructor () {
    this.afterRender = this.afterRender.bind(this)
  }
  
  async render () {
    const view = /* html */`        
      <div class="items-center justify-center mt-20">
        <div 
          class="error"
          data-text="404">
          404
        </div>        
      </div>  
        `
    return view
  }

  afterRender () {
    //console.log('afterRender')
  }
}
export default Error404