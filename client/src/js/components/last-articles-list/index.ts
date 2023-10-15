'use strict'
import Model from './model'
import View from './view'

/**
 * controller LastArticlesList
 * @param model
 * @param view
 * @return html to view articles
 */

class LastArticlesList {
    model: any;
    view: any;
    lastArticlesList: any;

    constructor () {
        this.model = new Model()
        this.view = new View()
    }

    async render () {
        this.lastArticlesList = await this.model.getLastArticlesList();
        const section = await this.view.appendLastArticlesList(this.lastArticlesList);
        return section;
    }

    afterRender () {
        // console.log('afterRender')
    }
}

export default LastArticlesList