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
    
    private article: {
        spec: string
    };
    private slug: string;

    constructor () {        
    }

    async render () {
        
        const request = new Utils().parseRequestURL()
        //console.log(request)
        this.slug = request.id;                
        //console.log('slug', this.slug) 

        //change url without reloading page
        //window.history.replaceState({}, null, `/article/${slug}`);

        this.article = await new Model().getArticle(this.slug);
        const section = await new ArticleView().appendArticles();
        return section;

    }

    parse(article: string) {
        //console.log(article);
        const tokenizer = new Tokenizer(article);    

        //console.log(tokenizer);
        const parser = new Parser(tokenizer.tokens);
        
        // find html element with id="article" in the DOM
        const virtualDOM = document.createElement('div');        
        
        const result: any = new View(parser.ast, virtualDOM).init();
        document.getElementById("article")?.append(result);

    }  


    async afterRender () {
        // console.log('afterRender')
        await this.parse(this.article.spec);        
        await Prism.highlightAll();        

        //set title page
        document.title = this.slug;

        // add utterances comments
        const script = document.createElement('script');
        script.src = 'https://utteranc.es/client.js';
        script.type = 'application/javascript';
        script.setAttribute('repo', 'meugenom/comments');
        script.setAttribute('issue-term', 'title');
        script.setAttribute('label', 'comments');
        script.setAttribute('theme', 'photon-dark');
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;

        // check if utterances comments is not already added
        if((document.getElementById('utterance-comments').contains(script) == false) && 
            (document.getElementById('utterance-comments').childElementCount == 0 )){            
                await document.getElementById('utterance-comments').appendChild(script);
        }
        
        // lazy load images
        const images = document.querySelectorAll('.lazy');
        images.forEach((img) => {
            Utils.lazyLoadImage(img as HTMLImageElement);
        });

    }
}

export default Article