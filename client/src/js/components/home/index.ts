'use strict'
/**
 * controller Home
 * @param model
 * @param view
 * @return users
 */

import Model from './model'
import View from './view'

class Home {
    model: Model;
    view: View;
    

  constructor () {
    this.model = new Model()
    this.view = new View()    
  }

  async render () {    
    const section = await this.view.appendHome()
    return section
  }

  afterRender () {
  }
}

export default Home