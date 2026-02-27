/**
 * @description controller for article page
 * @exports Article
 * @autor meugenom
 */

'use strict'
import Model from './model'
import ArticleView from './view'
import Utils from '../services/utils'
import SideBarLeftView, { TocHeading } from '../side-bar-left/view'

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
    
    private article!: {
        spec: string
    };
    private slug!: string;

    constructor () {        
    }

    async render () {

        const request = new Utils().parseRequestURL();
        this.slug = request.id ?? '';

        this.article = await new Model().getArticle(this.slug);

        return new ArticleView().appendArticles();
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

        // Set title FIRST — utterances reads document.title when the script loads
        document.title = this.slug;

        // Parse and highlight article content
        try {
            this.parse(this.article.spec);
            Prism.highlightAll();
        } catch (parseError) {
            console.error('Error parsing article content:', parseError);
        }

        // Build Table of Contents from parsed headings and inject into sidebar-left
        this.renderToc();

        // Attach utterances comments after browser has finished painting the article content
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const utteranceEl = document.getElementById('utterance-comments');
                if (utteranceEl && utteranceEl.childElementCount === 0) {
                    const script = document.createElement('script');
                    script.src = 'https://utteranc.es/client.js';
                    script.type = 'application/javascript';
                    script.setAttribute('repo', 'meugenom/comments');
                    script.setAttribute('issue-term', 'title');
                    script.setAttribute('label', 'comments');
                    const currentTheme = localStorage.getItem('theme') || 'light';
                    const utterancesTheme = currentTheme === 'dark' ? 'photon-dark' : 'github-light';
                    script.setAttribute('theme', utterancesTheme);
                    script.setAttribute('crossorigin', 'anonymous');
                    script.async = true;
                    utteranceEl.appendChild(script);
                }
            });
        });

        // Lazy load images
        const images = document.querySelectorAll('.lazy');
        images.forEach((img) => {
            Utils.lazyLoadImage(img as HTMLImageElement);
        });
    }
    private renderToc(): void {
        const articleEl = document.getElementById('article');
        if (!articleEl) return;

        const headingEls = articleEl.querySelectorAll('h1, h2, h3, h4');
        if (headingEls.length === 0) return;

        const headings: TocHeading[] = [];
        headingEls.forEach((el) => {
            const level = parseInt(el.tagName.replace('H', ''), 10);
            const text = el.textContent?.trim() ?? '';
            const id = el.getAttribute('id') ?? '';
            if (text && id) headings.push({ level, text, id });
        });

        const sidebarEl = document.getElementById('side-bar-left');
        if (!sidebarEl) return;

        sidebarEl.innerHTML = new SideBarLeftView().renderToc(headings);

        // Show left border on #page only when sidebar-left is present
        const pageEl = document.getElementById('page');
        if (pageEl) pageEl.classList.add('border-l');

        sidebarEl.querySelectorAll<HTMLElement>('.toc-link').forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-tocid');
                if (!targetId) return;
                const target = document.getElementById(targetId);
                if (target && pageEl) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

}

export default Article
