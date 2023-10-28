'use strict'
import Utils from '../services/utils';
import Model from './model'
import View from './view'

/**
 * controller About
 * @param model
 * @param view
 * @return html to view about page
 */

class About {
    model: any;
    view: any;
    about: any;

    constructor () {
        this.model = new Model()
        this.view = new View()
        this.about = ''
    }

    async render () {
        this.about = await this.view.appendAbout()
        return this.about
    }

    afterRender () { 
        // lazy load images
        const images = document.querySelectorAll('.lazy');
        images.forEach((img) => {
            Utils.lazyLoadImage(img as HTMLImageElement);
        });
    }
}

export default About