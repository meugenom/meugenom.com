'use strict'
import Model from './model'
import View from './view'
import Utils from '../services/utils'

/**
 * controller Navbar
 * @param model
 * @param view
 * @return html to view navbar
 */

class Navbar {

    model: any;
    view: any;
    navbar: any;

  constructor () {
    this.model = new Model()
    this.view = new View()
    this.navbar = ''
  }

  async render () {
    this.navbar = await this.view.appendNav()
    return this.navbar
  }

  afterRender () { 
    
    // Handling mobile menu toggle after render
    const mobileMenuToggle = document.getElementById('navbarButton');
  
    mobileMenuToggle.addEventListener('click', function () {      
      const mobileMenu = document.getElementById('example-navbar-danger');
      if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
        mobileMenu.style.display = 'block';
      } else {
        mobileMenu.style.display = 'none';
      }
    });

    // set active link on navbar by active route
    const url = new Utils().parseRequestURL();
    console.log('url', url)
    const home = document.getElementById('nav-home');
    const articles = document.getElementById('nav-articles');
    const projects = document.getElementById('nav-projects');
    const about = document.getElementById('nav-about');
    const illustrations = document.getElementById('nav-illustrations');

    switch (url.resource) {
      case '':
        home.classList.replace('opacity-50', 'opacity-100');
        home.classList.replace('hover:underline', 'underline');
        break;
      case 'articles':
        articles.classList.replace('opacity-50', 'opacity-100');
        articles.classList.replace('hover:underline', 'underline');
        break;
      case 'projects':
        projects.classList.replace('opacity-50', 'opacity-100');
        projects.classList.replace('hover:underline', 'underline');
        break;
        case 'illustrations':
          illustrations.classList.replace('opacity-50', 'opacity-100');
          illustrations.classList.replace('hover:underline', 'underline');
          break;
      case 'about':
        about.classList.replace('opacity-50', 'opacity-100');
        about.classList.replace('hover:underline', 'underline');
        break;
      default:
        home.classList.add('active');
        break;
    }

  }

}

export default Navbar