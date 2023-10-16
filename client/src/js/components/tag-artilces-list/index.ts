'use strict'
import Model from './model'
import View from './view'
import Utils from '../services/utils'


/**
 * controller TagArticlesList
 * @param model
 * @param view
 * @return html to view articles list by tag page
 */

class TagArticlesList {
    model: any;
    view: any;
    articlesList: any;

    constructor () {
        this.model = new Model()
        this.view = new View()
    }

    async render () {
        
        const request = new Utils().parseRequestURL()
        console.log(request)
        const tag = request.id;                
        console.log('tag', tag)

        this.articlesList = await this.model.getArticlesList(tag);
        const section = await this.view.appendTagArticlesList(this.articlesList);
        return section;

    }

    async afterRender () {
        // console.log('afterRender')
    }
}

export default TagArticlesList