'use strict'
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
        //nothing
    }
}

export default About