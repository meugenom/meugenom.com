'use strict'
import Model from './model'
import View from './view'

/**
 * controller Articles
 * @param model
 * @param view
 * @return html to view articles
 */

class ArticlesList {
    model: any;
    view: any;
    articlesList: any;

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
        // console.log('afterRender')
    }
}

export default ArticlesList