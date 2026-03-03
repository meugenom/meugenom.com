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
    private article_title!: string;

    constructor () {        
    }

    async render () {

        const request = new Utils().parseRequestURL();
        this.slug = request.id ?? '';

        this.article = await new Model().getArticle(this.slug);
        this.article.spec; // Article spec as string, e.g. from markdown file with front matter metadata

                // Find meta description where name="description" and set content to first 150 chars of article spec (without markdown syntax)
        const metaDescription = document.querySelector('meta[name="description"]');        
        if (metaDescription) {
            const tempDiv = document.createElement('div');                        
            // Need only the text spec from --- to --- in article spec for meta description, as it contains the actual article content without title and metadata
            const specMatch =this.article.spec.match(/---\s*([\s\S]*?)\s*---/);   
            
            // get "title: 'text text text...' "            
            const titleMatch = specMatch ? specMatch[1].match(/title:\s*['"]([^'"]+)['"]/) : null;            
            const title = titleMatch ? titleMatch[1] : null;

            this.article_title = title ?? '';

            
            // get "categories: cat1 cat2 ... " as comma separated string
            const categoriesMatch = specMatch ? specMatch[1].match(/categories:\s*([^\n]+)/) : null;
            const categories = categoriesMatch ? categoriesMatch[1].split(/\s+/).join(', ') : null;

            // get "tags : tag1 tag2 ... " as comma separated string
            const tagsMatch = specMatch ? specMatch[1].match(/tags:\s*([^\n]+)/) : null;
            const tags = tagsMatch ? tagsMatch[1].split(/\s+/).join(', ') : null;

            // summarize title, categories, tags            
            const metaInfo = [title, categories, tags].filter(Boolean).join(' | ');            

            tempDiv.innerHTML = metaInfo; // Use metaInfo instead of article.spec to avoid markdown syntax in meta description

            console.log(tempDiv.textContent);
            const textContent = tempDiv.textContent || tempDiv.innerText || '';
            metaDescription.setAttribute('content', textContent.substring(0, 200));
        }

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

        document.title = this.article_title;

        // Parse and highlight article content
        try {
            this.parse(this.article.spec);
            Prism.highlightAll();
        } catch (parseError) {
            console.error('Error parsing article content:', parseError);
        }

        // Attach giscus comments after browser has finished painting the article content
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const giscusEl = document.getElementById('giscus-comments');
                if (giscusEl && giscusEl.childElementCount === 0) {
                    const script = document.createElement('script');
                    script.src = 'https://giscus.app/client.js';
                    script.setAttribute('data-repo', 'meugenom/comments');
                    script.setAttribute('data-repo-id', 'R_kgDOKam9-w');
                    script.setAttribute('data-category', 'Announcements');
                    script.setAttribute('data-category-id', 'DIC_kwDOKam9-84C3muT');
                    script.setAttribute('data-mapping', 'pathname');
                    script.setAttribute('data-strict', '0');
                    script.setAttribute('data-reactions-enabled', '1');
                    script.setAttribute('data-emit-metadata', '0');
                    script.setAttribute('data-input-position', 'bottom');
                    script.setAttribute('data-theme', 'preferred_color_scheme');
                    script.setAttribute('data-lang', 'en');
                    script.setAttribute('data-loading', 'lazy');
                    script.setAttribute('crossorigin', 'anonymous');
                    script.async = true;
                    giscusEl.appendChild(script);
                }
            });
        });

        // Build Table of Contents from parsed headings and inject into sidebar-left
        this.renderToc();


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
