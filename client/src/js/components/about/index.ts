'use strict'
import Utils from '../services/utils';
import Model from './model';
import View from './view';
import { convertMDtoHTML } from 'markdown-tailwind-css-compiler';
import 'markdown-tailwind-css-compiler/dist/main.css';

/**
 * Controller for About component
 */
class About {
    model: Model;
    view: View;
    rawMarkdown: string = '';

    constructor() {
        this.model = new Model();
        this.view = new View();
    }

    async render() {
        // Fetch article data before router renders the DOM element
        this.rawMarkdown = await this.model.getAboutArticle();

        // Return layout template
        return this.view.appendAbout();
    }

    async afterRender() {
        // Parse Markdown and inject rendered HTML into DOM
        if (this.rawMarkdown) {
            let htmlContent = await convertMDtoHTML(this.rawMarkdown);

            // Convert relative image paths to absolute paths
            htmlContent = htmlContent.replace(/src="(?!(https?:|\/|data:))([^"]+)"/g, 'src="/$2"');

            const rootElement = document.getElementById('about-article');
            if (rootElement) {
                rootElement.innerHTML = htmlContent;
            }
        }

        // Lazy load images
        const images = document.querySelectorAll('.lazy');
        images.forEach((img) => {
            Utils.lazyLoadImage(img as HTMLImageElement);
        });
    }
}

export default About;