'use strict'
import Utils from '../services/utils'
import View from './view'

/**
 * controller Layout 
 * @param view
 */


class Layout {    
    private view: View;    

  constructor () {    
    this.view = new View()
    
  }

  async getHTMLElement () {    
    const section = await this.view.getLayoutHTMLElement();
    return section
  } 

  afterRender () {   
    return           
  }
}

export default Layout