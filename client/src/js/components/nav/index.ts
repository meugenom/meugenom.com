'use strict'
import Model from './model'
import View from './view'

/**
 * controller Navbar
 * @param model
 * @param view
 * @return html to view navbar
 */

class Navbar {

    model: Model;
    view: View;
    navbar: string;
    //routes: any;
    history: any;

  constructor () {
    this.model = new Model()
    this.view = new View()
    this.navbar = ''
    this.history = []
  }

  async render () {
    this.navbar = await this.view.appendNav()
    return this.navbar
  }

  async afterRender () { 
    
    /*
    // Handling mobile menu toggle after render
    const mobileMenuToggle = document.getElementById('navbarButton');
  
    mobileMenuToggle.addEventListener('click', function () {     
      const mobileMenu = document.getElementById('mobile-menu-opened');
      if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
        mobileMenu.style.display = 'block';
      } else {
        mobileMenu.style.display = 'none';
      }
    });
    */
  }

}

export default Navbar