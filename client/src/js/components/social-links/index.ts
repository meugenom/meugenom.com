'use strict'
import Model from './model'
import View from './view'

/**
 * controller Navbar
 * @param model
 * @param view
 * @return html to view navbar
 */

class SocialLinks {

    model: Model;
    view: View;
    socialLinks: string;

  constructor () {
    this.model = new Model()
    this.view = new View()
    this.socialLinks = ''
  }

  async render () {
    this.socialLinks = await this.view.appendSocialLinks()
    return this.socialLinks
  }

  afterRender () { }
}

export default SocialLinks