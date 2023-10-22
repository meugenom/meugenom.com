'use strict'
/**
 * controller Home
 * @param model
 * @param view
 * @return users
 */

import Model from './model'
import View from './view'

class Illustration {
    model: any;
    view: any;
    articles: any;

  constructor () {
    this.model = new Model()
    this.view = new View()
    this.articles = {}
  }

  async render () {    
    const section = await this.view.appendIllustration()
    return section
  }

  afterRender () {
  }
}

export default Illustration