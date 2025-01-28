/**
 * @author meugenom
 * @data 20.11.2023
 */

import Navbar from './../components/nav'
import SideBarLeft from '../components/side-bar-left'
import SideBarRight from '../components/side-bar-right'
import Layout from '../components/layout'
import Footer from '../components/footer'
import Error404 from '../components/error404'
import IRoutes from './../components/interfaces/IRoutes'
import Utils from '../components/services/utils'

/**
 * Router
 * @class
 * @classdesc Router class to handle routing
 * @export
 * @implements {IRouter}
 * @example new Router(routes)
 * @param {IRoutes} routes - routes object
 */
class Router {
    
    routes: IRoutes;
    header: HTMLElement;
    content: HTMLElement;
    footer: HTMLElement;
    sideBarLeft: HTMLElement;
    sideBarRight: HTMLElement;
    layout: HTMLElement;
    
    headerComponent: Navbar;
    footerComponent: Footer;
    sideBarLeftComponent: SideBarLeft;
    sideBarRightComponent: SideBarRight;
    layoutComponent: Layout;

    request: {
        resource: string | null;
        id: string | null;
        verb: string | null;    
    };

    static instance: Router | null = null;

    constructor (routes: IRoutes) {
        this.routes = routes;
        this.header = document.getElementById('header');        
        this.layout = document.getElementById('layout');
        this.footer = document.getElementById('footer');

        this.headerComponent  = new Navbar();
        this.footerComponent  = new Footer();
        this.sideBarLeftComponent = new SideBarLeft();
        this.sideBarRightComponent = new SideBarRight(); 
        this.layoutComponent = new Layout();

        // Listen on hash change:
        this.init();
    }

    // render header, content and footer
    async init () {    
        //render header
        this.header.innerHTML = await this.headerComponent.render();
        await this.headerComponent.afterRender();

        //render layout
        this.layout.innerHTML = await this.layoutComponent.render();
        await this.layoutComponent.afterRender();        
        
        //get the side bar left and right on the layout
        this.sideBarLeft = await document.getElementById('side-bar-left');
        this.sideBarRight = await document.getElementById('side-bar-right');

        // render side bar left
        this.sideBarLeft.innerHTML = await this.sideBarLeftComponent.render();     

        // get the location of the content block on the layout
        this.content = await document.getElementById('page');

        //render content
        const parsedURL = this.parseUrl();
        await this.renderPage(parsedURL);

        //render side bar right
        this.sideBarRight.innerHTML = await this.sideBarRightComponent.render();

        //render footer
        this.footer.innerHTML = await this.footerComponent.render();
        await this.footerComponent.afterRender();

        this.attachLinkListeners();
    }

    // Parse URL and return resource, id and verb
    parseUrl() {
        this.request = new Utils().parseRequestURL();
        return (this.request.resource ? '/' + this.request.resource : '/') + (this.request.id ? '/:id' : '') + (this.request.verb ? '/' + this.request.verb : '');
    }

    // Render page from hash
    async renderPage(parsedURL: string) {
        this.footer.innerHTML = "";
        const page = this.routes[parsedURL] ? this.routes[parsedURL] : new Error404();
        this.content.innerHTML = await page.render();
        await page.afterRender();

        //rerender footer
        this.footer.innerHTML = await this.footerComponent.render();
        await this.footerComponent.afterRender();

        if (parsedURL.includes('/:id')) {
            const cleanParsedId = parsedURL.replace('/:id','');
            window.history.pushState({}, cleanParsedId, window.location.origin + '/#'+ cleanParsedId + '/' + this.request.id);
        }
    }

    // Handle hash change
    async handleLinkClick(event: Event) {
        event.preventDefault();

        const clickedLink = event.target as HTMLElement;
        const navigateLinkTo = clickedLink.getAttribute('navigateLinkTo');

        window.history.pushState({}, navigateLinkTo, window.location.origin + navigateLinkTo);

        await this.renderPage(navigateLinkTo);

        //make inactive links
        const links = document.querySelectorAll('[navigateLinkTo]');
        links.forEach(link => {                        
            link.classList.remove('active-links');
        });

        //make active clicked link        
        clickedLink.classList.add('active-links');
        
        //close mobile menu
        //const mobileMenu = document.getElementById('mobile-menu-opened');
        //mobileMenu.style.display = 'none';

    }

    // Attach link listeners to navigation links
    attachLinkListeners() {
        const links = document.querySelectorAll('[navigateLinkTo]');
        links.forEach(link => {
            link.addEventListener('click', (event: Event) => this.handleLinkClick(event));
        });
    }
}

export default Router