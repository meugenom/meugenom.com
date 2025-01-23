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
    
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'theme-light';

    if (currentTheme === 'theme-dark') {
      document.documentElement.classList.add('theme-light');
    } else {
      document.documentElement.classList.add('theme-light');
    }

    themeToggleBtn.addEventListener('click', () => {
      
      //console.log('themeToggleBtn clicked');
      //console.log(document.getElementById('theme-block').classList);
      
      if (document.documentElement.classList.contains('theme-dark')) {
        document.documentElement.classList.remove('theme-dark');
        document.documentElement.classList.add('theme-light');
        localStorage.setItem('theme', 'theme-light');
      } else {
        document.documentElement.classList.remove('theme-light');
        document.documentElement.classList.add('theme-dark');
        localStorage.setItem('theme', 'theme-dark');
      }
    });
  }

}

export default Navbar