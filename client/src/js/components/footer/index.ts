'use strict'
import Model from './model'
import View from './view'

/**
 * controller Footer
 * @param model
 * @param view
 * @return html to view footer
 */

class Footer {
    model: Model;
    view: View;
    footer: string;

    constructor () {
        this.model = new Model()
        this.view = new View()
        this.footer = ''
    }

    async render () {
        this.footer = await this.view.appendFooter()
        return this.footer
    }

    afterRender () { 
        //nothing
    }
}

export default Footer