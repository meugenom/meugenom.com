/**
 * @author meugenom
 * @data 20.11.2023
 */

import Config from '../config'

import Navbar from './../components/nav'

import Layout from '../components/layout'
import SideBarRight from '../components/side-bar-right'
import Footer from '../components/footer'

import Error404 from '../components/error404'
import Error502 from '../components/error502'
import Error500 from '../components/error500'

import IRoutes from './../components/interfaces/IRoutes'
import Utils from '../components/services/utils'

/**
 * @class Router
 * @classdesc Router class to handle routing
 * @export
 * @implements {IRouter}
 * @example new Router(routes)
 * @param {IRoutes} routes - routes object
 */
class Router {
  routes: IRoutes;
  header!: HTMLElement;
  content!: HTMLElement;
  footer!: HTMLElement;
  layout!: HTMLElement;

  headerComponent: Navbar;
  footerComponent: Footer;
  layoutComponent: Layout;
  sideBarRightComponent: SideBarRight;

  request!: {
    resource: string | null;
    id: string | null;
    verb: string | null;
  };

  static instance: Router | null = null;
  private boundHandleLinkClick: (event: Event) => void;
  private lastRenderedPath: string = '';

  constructor(routes: IRoutes) {
    this.routes = routes;
    this.header = document.getElementById('header') as HTMLElement;
    this.footer = document.getElementById('footer') as HTMLElement;
    this.layout = document.getElementById('layout') as HTMLElement;

    this.headerComponent = new Navbar();
    this.footerComponent = new Footer();
    this.layoutComponent = new Layout();
    this.sideBarRightComponent = new SideBarRight();

    // Bind once — required for removeEventListener to work correctly
    this.boundHandleLinkClick = this.handleLinkClick.bind(this);

    // Reagiere auf Browser-Navigation (Zurück/Vorwärts)
    // Nur neu rendern wenn sich der Pfad wirklich geändert hat.
    // Giscus und andere Bibliotheken können history.replaceState aufrufen
    // und so einen spurious popstate auslösen.
    window.addEventListener('popstate', () => {
      if (location.pathname !== this.lastRenderedPath) {
        this.renderContent();
      }
    });

    // Listen on hash change:
    this.init();
  }

  // render header, content and footer
  async init() {
    if (!Router.instance) {
      // First load — render static shell once
      await this.renderHeader();
      await this.renderLayout();
      Router.instance = this;
    }
    // Always re-render content on navigation (footer is rendered inside renderPage)
    await this.renderContent();
    this.attachLinkListeners();
  }

  async renderHeader() {
    this.header.innerHTML = await this.headerComponent.render();
    await this.headerComponent.afterRender();
  }

  async renderLayout() {
    const layoutHTML = await this.layoutComponent.getHTMLElement();
    const contentElement = document.getElementById('content');

    if (contentElement && !document.getElementById('layout')) {
      contentElement.appendChild(layoutHTML);
    }

    const sideBarRight = await this.sideBarRightComponent.render();
    const sideBarRightEl = document.getElementById('side-bar-right');
    if (sideBarRightEl) sideBarRightEl.innerHTML = sideBarRight;
  }

  async renderContent() {
    
    // if rendering layout after articles, need to make title and meta description again as 
    document.title = Config.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', Config.description);
    }
    
    // Set content element and parse URL for every content render (e.g. after hash change or link click)
    this.content = document.getElementById('page') as HTMLElement;
    const parsedURL = this.parseUrl();
    this.lastRenderedPath = location.pathname;
    await this.renderPage(parsedURL);
    
    // Links nach jedem Content-Update neu binden
    this.attachLinkListeners();

  }

  async renderFooter() {
    this.footer.innerHTML = await this.footerComponent.render();
    await this.footerComponent.afterRender();
  }

  // Parse URL and return resource, id and verb
  parseUrl() {
    this.request = new Utils().parseRequestURL();
    return (this.request.resource ? '/' + this.request.resource : '/') + 
           (this.request.id ? '/:id' : '') + 
           (this.request.verb ? '/' + this.request.verb : '');

  }

  // Render page from hash
  async renderPage(parsedURL: string) {
    this.footer.innerHTML = "";

    // Hide sidebar-left on all non-article pages (ToC is injected by Article controller)
    // Note: check for '/:id' to avoid matching '/articles' (blog list page)
    if (!(parsedURL.includes('/article') && parsedURL.includes('/:id'))) {
      const sidebarEl = document.getElementById('side-bar-left');
      if (sidebarEl) sidebarEl.innerHTML = '';
      // Remove left border from #page when sidebar-left is cleared
      const pageEl = document.getElementById('page');
      if (pageEl) pageEl.classList.remove('border-l');
    }
    const page = this.routes[parsedURL] ? this.routes[parsedURL] : new Error404();
    try {
      this.content.innerHTML = await page.render();
      await page.afterRender();
    } catch (err) {
      console.error('renderPage error:', err);
      const errPage = new Error502();
      this.content.innerHTML = await errPage.render();
      await errPage.afterRender();
    }

    //rerender footer
    await this.renderFooter();

    if (parsedURL.includes('/:id')) {
      const cleanParsedId = parsedURL.replace('/:id', '');
      const targetPath = cleanParsedId + '/' + this.request.id;
      const targetUrl = window.location.origin + targetPath + window.location.search + window.location.hash;
      if (window.location.href !== targetUrl) {
        window.history.pushState({}, cleanParsedId, targetUrl);
      }
    }
  }

  // Handle hash change
  async handleLinkClick(event: Event) {
    event.preventDefault();

    //const clickedLink = event.target as HTMLElement;

    // Findet den Link, auch wenn man auf ein Icon darin klickt
    const clickedLink = (event.target as HTMLElement).closest('[navigateLinkTo]');
    if (!clickedLink) return;

    const navigateLinkTo = clickedLink.getAttribute('navigateLinkTo') ?? '/';

    //window.history.pushState({}, navigateLinkTo, window.location.origin + navigateLinkTo);
    // 3. FIX: URL sauber in die History pushen (ohne #)
    window.history.pushState({}, '', window.location.origin + navigateLinkTo);


    await this.renderContent();    

    //make inactive links
    const links = document.querySelectorAll('[navigateLinkTo]');
    links.forEach(link => {
      link.classList.remove('active-links');
    });

    //make active clicked link        
    clickedLink.classList.add('active-links');
  }

  attachLinkListeners() {
    const links = document.querySelectorAll<HTMLElement>('[navigateLinkTo]');
    links.forEach(link => {
      link.removeEventListener('click', this.boundHandleLinkClick);
      link.addEventListener('click', this.boundHandleLinkClick);
    });
  }
}

export default Router;