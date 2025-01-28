'use strict'
import Utils from '../services/utils'
import View from './view'

/**
 * controller SideBarLeft 
 * @param view
 */


class SideBarLeft {    
    private view: View;    

  constructor () {    
    this.view = new View()
    
  }

  async render () {    
    const section = await this.view.appendSideBarLeft()
    return section
  } 

  afterRender () {              
  }
}

export default SideBarLeft