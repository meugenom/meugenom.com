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

  async render () {    
    const section = await this.view.appendLayout()
    return section
  } 

  afterRender () {              
  }
}

export default Layout