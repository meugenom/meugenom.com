'use strict'
import Model from './model'
import View from './view'
import Utils from '../services/utils'
import Home from '../home';
import ArticlesList from '../articles-list';
import ProjectsList from '../projects-list';
import Article from '../article';
import TagArticlesList from '../tag-artilces-list';
import TagsGarten from '../tags-garten';
import About from '../about';
import Illustration from '../illustration';
import Error404 from '../error404';

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
    const illustration = document.getElementById('nav-illustration');

    //listen to click event on navbar links
    //const navbarLinks = document.getElementById('navbarLinks');
    
    /*
    navbarLinks.addEventListener('click', async (event: any) => {      
      event.preventDefault();

      // get clicked link
      const clickedLink = event.target;
      const linkTo = clickedLink.getAttribute('linkTo');
      console.log('linkTo', linkTo)

      //need to show right link in the browser search bar
      window.history.pushState({}, linkTo, window.location.origin + linkTo);
      

      // render clicked link
      const page = this.routes[linkTo] ? this.routes[linkTo] : new Error404()
      let content = null || document.getElementById('page')
      content.innerHTML = await page.render()
      await page.afterRender()

      //add to history
      this.history.push(linkTo.split('/')[1]);

      // set old active link to inactive
      switch (this.history[this.history.length - 2]) {
        case '':
          home.classList.replace('opacity-100', 'opacity-50',);
          home.classList.replace('underline', 'hover:underline');
          break;
        case 'articles':
          articles.classList.replace('opacity-100', 'opacity-50');
          articles.classList.replace('underline', 'hover:underline');
          break;
        case 'projects':
          projects.classList.replace('opacity-100', 'opacity-50');
          projects.classList.replace('underline', 'hover:underline');          
          break;
          case 'illustrations':
            illustration.classList.replace('opacity-100', 'opacity-50');
            illustration.classList.replace('underline', 'hover:underline');

            break;
        case 'about':
          about.classList.replace('opacity-100', 'opacity-50');
          about.classList.replace('underline', 'hover:underline');
          break;
        default:
          home.classList.remove('active');
          break;
      }

      switch (linkTo.split('/')[1]) {
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
            illustration.classList.replace('opacity-50', 'opacity-100');
            illustration.classList.replace('hover:underline', 'underline');
            break;
        case 'about':
          about.classList.replace('opacity-50', 'opacity-100');
          about.classList.replace('hover:underline', 'underline');
          break;
        default:
          home.classList.add('active');
          break;
      }

    });
    */

  }

}

export default Navbar