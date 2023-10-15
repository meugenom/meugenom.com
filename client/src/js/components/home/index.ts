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
    model: any;
    view: any;
    articles: any;

  constructor () {
    this.model = new Model()
    this.view = new View()
    this.articles = {}
  }

  async render () {
    this.articles = await this.model.setArticles()
    const section = await this.view.appendArticles(this.articles)
    return section
  }

  afterRender () {
  }
}

export default Home