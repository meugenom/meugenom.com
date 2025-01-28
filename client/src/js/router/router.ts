/**
 * @author meugenom
 * @data 20.11.2023
 */

import Navbar from './../components/nav'

import Layout from '../components/layout'
import SideBarRight from '../components/side-bar-right'
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
    layout: HTMLElement;

    headerComponent: Navbar;
    footerComponent: Footer;
    layoutComponent: Layout;
    sideBarRightComponent: SideBarRight;

    request: {
        resource: string | null;
        id: string | null;
        verb: string | null;
    };

    static instance: Router | null = null;

    constructor(routes: IRoutes) {
        this.routes = routes;
        this.header = document.getElementById('header');
        this.footer = document.getElementById('footer');
        this.layout = document.getElementById('layout');

        this.headerComponent = new Navbar();
        this.footerComponent = new Footer();
        this.layoutComponent = new Layout();
        this.sideBarRightComponent = new SideBarRight();


        // Listen on hash change:
        this.init();
    }

    // render header, content and footer
    async init() {

        //render header
        this.header.innerHTML = await this.headerComponent.render();
        await this.headerComponent.afterRender();

        //render layout
        let layoutHTML = await this.layoutComponent.getHTMLElement();

        // add layout element to the document
        if (document.getElementById('content') !== null
            || document.getElementById('content') !== undefined
            || document.getElementById('content').textContent !== ""
        ) {
            if (document.getElementById('layout') === null
                || document.getElementById('layout') === undefined
                || document.getElementById('layout').textContent === ""
            ) {
                // add right side bar
                document.getElementById('content').appendChild(layoutHTML);
            }
        }

        const sideBarRight = await this.sideBarRightComponent.render();
        document.getElementById('side-bar-right').innerHTML = sideBarRight;

        // get content element from added layout element
        this.content = document.getElementById('page')


        //render content
        const parsedURL = this.parseUrl();
        await this.renderPage(parsedURL);

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
            const cleanParsedId = parsedURL.replace('/:id', '');
            window.history.pushState({}, cleanParsedId, window.location.origin + '/#' + cleanParsedId + '/' + this.request.id);
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

    }

    attachLinkListeners() {
        const links = document.querySelectorAll<HTMLElement>('[navigateLinkTo]');
        links.forEach(link => {
            link.removeEventListener('click', this.handleLinkClick); // Avoid duplicates
            link.addEventListener('click', (event: Event) => this.handleLinkClick(event));
        });
    }
}

export default Router