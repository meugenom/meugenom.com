/**
 * @author meugenom
 * @data 20.11.2023
 */

import Navbar from './../components/nav'
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
    
    headerComponent: Navbar;
    footerComponent: Footer;

    request: {
        resource: string | null;
        id: string | null;
        verb: string | null;    
    };

    static instance: Router | null = null;

    constructor (routes: IRoutes) {
        this.routes = routes;
        this.header = document.getElementById('header');
        this.content = document.getElementById('page');
        this.footer = document.getElementById('footer');

        this.headerComponent  = new Navbar();
        this.footerComponent  = new Footer();

        this.init();
    }

    // render header, content and footer
    async init () {    
        this.header.innerHTML = await this.headerComponent.render();
        await this.headerComponent.afterRender();

        const parsedURL = this.parseUrl();
        await this.renderPage(parsedURL);

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
        const page = this.routes[parsedURL] ? this.routes[parsedURL] : new Error404();
        this.content.innerHTML = await page.render();
        await page.afterRender();

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