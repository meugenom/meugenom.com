/**
 * @description Router class that will handle the routing of the application
 * @exports Router
 * @autor meugenom
 */

import Navbar from './../components/nav/index'
import Home from './../components/home/index'
import Footer from '../components/footer/index'

import ArticlesList from '../components/articles-list/index'
import Article from '../components/article/index'
import Error404 from '../components/error404/index'
import ProjectsList from '../components/projects-list/index'
import TagArticlesList from '../components/tag-artilces-list/index'

import Utils from '../components/services/utils'

interface IRoutes {
    [key: string]: any
}  

class Router {

    routes: IRoutes;
    header: HTMLElement;
    content: HTMLElement;
    footer: HTMLElement;

    constructor () {
        this.routes = {
        '/': new Home(),
        '/articles': new ArticlesList(),
        '/projects': new ProjectsList(),
        '/article/:id': new Article(),
        '/tag/:id': new TagArticlesList(),
        }

    // start
    this.header = null || document.getElementById('header')
    this.content = null || document.getElementById('page')
    this.footer = null || document.getElementById('footer')
    this.init()
  }

  async init () {
    
    // Render the Header and footer of the page
    this.header.innerHTML = await new Navbar().render()
    await new Navbar().afterRender()

    const request = new Utils().parseRequestURL()
    const parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    console.log('parsedURL', parsedURL)
    
    const page = this.routes[parsedURL] ? this.routes[parsedURL] : new Error404()
    this.content.innerHTML = await page.render()
    await page.afterRender()

    this.footer.innerHTML = await new Footer().render()
    await new Footer().afterRender()
  }
}

export default Router