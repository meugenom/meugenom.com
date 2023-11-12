'use strict'
import ITags from '../interfaces/ITags';
/**
 * controller Home
 * @param model
 * @param view
 * @return users
 */

import Model from './model'
import View from './view'

class TagsTree {
    
    private model: Model;
    private view: View;
    private tags: ITags[];
    private section : string;

  constructor () {
    this.model = new Model()
    this.view = new View()
    this.tags = []
  }

  async render () {
    this.tags = await this.model.getTags()
    const section = await this.view.appendTags(this.tags)
    return section
  }

  afterRender () {
  }
}

export default TagsTree