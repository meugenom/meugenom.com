'use strict'
import Model from './model'
import View from './view'
import IArticle from '../interfaces/IArticle'

/**
 * controller Articles List
 * @param model
 * @param view
 * @return html to view articles list
 */


class ArticlesList {
    model: Model;
    view: View;
    articlesList: IArticle[];

    constructor () {
        this.model = new Model()
        this.view = new View()
    }

    async render () {
        this.articlesList = await this.model.getArticlesList();
        const section = await this.view.appendArticlesList(this.articlesList);
        return section;
    }

    afterRender () {
        // nothing to do
    }
}

export default ArticlesList