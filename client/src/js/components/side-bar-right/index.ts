'use strict'
import Utils from '../services/utils'
import View from './view'

/**
 * controller SideBarRight
 * @param view
 */


class SideBarRight {    
    private view: View;    

  constructor () {    
    this.view = new View()
    
  }

  async render () {    
    const section = await this.view.appendSideBarRight()
    return section
  } 

  afterRender () {              
  }
}

export default SideBarRight