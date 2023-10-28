'use strict'
import Utils from '../services/utils'
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
    const images = document.querySelectorAll('.lazy');
    images.forEach((img) => {
      Utils.lazyLoadImage(img as HTMLImageElement);
    });
  }
}



export default Illustration