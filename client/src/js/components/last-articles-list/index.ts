'use strict'
import Model from './model'
import View from './view'
import IArticle from '../interfaces/IArticle'

/**
 * controller LastArticlesList
 * @param model
 * @param view
 * @return html to view articles
 */

class LastArticlesList {
    model: Model;
    view: View;
    lastArticlesList: IArticle[];

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