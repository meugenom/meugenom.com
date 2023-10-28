'use strict'
import Utils from '../services/utils'
import View from './view'

/**
 * controller Illustration 
 * @param view
 */


class Illustration {    
    private view: View;    

  constructor () {    
    this.view = new View()
    
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