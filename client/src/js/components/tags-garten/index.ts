'use strict'
/**
 * controller Home
 * @param model
 * @param view
 * @return users
 */

import Model from './model'
import View from './view'

class TagsGarten {
    model: any;
    view: any;
    tags: any;

  constructor () {
    this.model = new Model()
    this.view = new View()
    this.tags = {}
  }

  async render () {
    this.tags = await this.model.getTags()
    const section = await this.view.appendTags(this.tags)
    return section
  }

  afterRender () {
  }
}

export default TagsGarten