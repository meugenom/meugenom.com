/**
 * @author meugenom
 * @data 20.11.2023
 * @updated 2026
 */

import Config from '../config'

import Navbar from './../components/nav'
import Layout from '../components/layout'
import SideBarRight from '../components/side-bar-right'
import Footer from '../components/footer'

import Error404 from '../components/error404'
import Error502 from '../components/error502'

import IRoutes from './../components/interfaces/IRoutes'
import Utils from '../components/services/utils'

/**
 * @class Router
 * @classdesc Router class to handle routing
 * @export
 * @implements {IRouter}
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
    window.addEventListener('popstate', () => {
      if (location.pathname !== this.lastRenderedPath) {
        this.renderContent();
      }
    });

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
    // Always re-render content on navigation
    await this.renderContent();
    this.attachLinkListeners();
  }

  async renderHeader() {
    const headerHTML = await this.headerComponent.render();
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = headerHTML;
    
    this.header.replaceChildren(...tempContainer.childNodes);
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
    // Meta-Tags актуализируются при каждом рендере
    document.title = Config.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', Config.description);
    }
    
    this.content = document.getElementById('page') as HTMLElement;
    const parsedURL = this.parseUrl();
    this.lastRenderedPath = location.pathname;
    
    await this.renderPage(parsedURL);
    
    // Обновляем слушатели и синхронизируем состояние активных ссылок в меню
    this.attachLinkListeners();
    this.updateActiveLinks();
  }

  async renderPage(parsedURL: string) {    
    // Hide sidebar-left on all non-article pages
    if (!(parsedURL.includes('/article') && parsedURL.includes('/:id'))) {
      const sidebarEl = document.getElementById('side-bar-left');
      if (sidebarEl) {
        sidebarEl.classList.add('hidden');
        sidebarEl.classList.remove('lg:block');
      }
      const pageEl = document.getElementById('page');
      if (pageEl) pageEl.classList.remove('border-l');
    }
    
    const page = this.routes[parsedURL] ? this.routes[parsedURL] : new Error404();
    
    try {
      const pageHTML = await page.render();
      const tempPageContainer = document.createElement('div');
      tempPageContainer.innerHTML = pageHTML;
      
      this.content.replaceChildren(...tempPageContainer.childNodes);
      await page.afterRender();
    } catch (err) {
      console.error('renderPage error:', err);
      const errPage = new Error502();
      const tempErrContainer = document.createElement('div');
      tempErrContainer.innerHTML = await errPage.render();
      
      this.content.replaceChildren(...tempErrContainer.childNodes);
      await errPage.afterRender();
    }

    await this.renderFooter();
  }

  async renderFooter() {
    const footerHTML = await this.footerComponent.render();
    const tempFooterContainer = document.createElement('div');
    tempFooterContainer.innerHTML = footerHTML;
    
    this.footer.replaceChildren(...tempFooterContainer.childNodes);
    await this.footerComponent.afterRender();
  }

  // Parse URL and return resource, id and verb
  parseUrl() {
    this.request = new Utils().parseRequestURL();
    return (this.request.resource ? '/' + this.request.resource : '/') + 
           (this.request.id ? '/:id' : '') + 
           (this.request.verb ? '/' + this.request.verb : '');
  }

  // Автоматическая подсветка активных элементов меню на основе текущего URL
  private updateActiveLinks() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll<HTMLElement>('[navigateLinkTo]');
    
    links.forEach(link => {
      const linkPath = link.getAttribute('navigateLinkTo');
      if (linkPath === currentPath) {
        link.classList.add('active-links');
      } else {
        link.classList.remove('active-links');
      }
    });
  }

  // Handle link click
  async handleLinkClick(event: Event) {
    event.preventDefault();

    const clickedLink = (event.target as HTMLElement).closest('[navigateLinkTo]');
    if (!clickedLink) return;

    const navigateLinkTo = clickedLink.getAttribute('navigateLinkTo') ?? '/';
    window.history.pushState({}, '', window.location.origin + navigateLinkTo);

    await this.renderContent();    
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