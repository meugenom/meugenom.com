/**
 * @description controller for article page
 * @exports Article
 * @autor meugenom
 */

'use strict'
import Model from './model'
import ArticleView from './view'
import Utils from '../services/utils'

// import parser for markable text
import { Tokenizer } from "../../../static/libs/parser/Tokenizer";
import { Parser } from "../../../static/libs/parser/Parser";
import { View } from "../../../static/libs/parser/View";

// import prismjs
import * as Prism from "prismjs";


/**
 * controller Article
 * @param model
 * @param view
 * @return html to view article page
 */

class Article {
    //model: any;
    //view: any;
    article: any;

    constructor () {
        //this.model = new Model()
        //this.view = new View()
    }

    async render () {
        
        const request = new Utils().parseRequestURL()
        console.log(request)
        const slug = request.id;                
        console.log('slug', slug) 

        //change url without reloading page
        //window.history.replaceState({}, null, `/article/${slug}`);

        this.article = await new Model().getArticle(slug);
        const section = await new ArticleView().appendArticles();
        return section;

    }

    parse(article: string) {
        const tokenizer = new Tokenizer(article);    
        //console.log(tokenizer);
        const parser = new Parser(tokenizer.tokens);    
        //console.log(parser.ast);
        new View(parser.ast);
    }  


    async afterRender () {
        // console.log('afterRender')
        await this.parse(this.article.spec);
        await Prism.highlightAll();

    }
}

export default Article