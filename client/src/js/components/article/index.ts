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
import { Render } from "../../../static/libs/parser/Render";


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

            // get "cluster: name as slug name"
            const clusterMatch = specMatch ?  specMatch[1].match(/cluster:\s*([^\n]+)/) : null;
            const cluster = clusterMatch ? clusterMatch[1] : null;

            // get "order: number as 0 ..."
            const orderMatch = specMatch ?  specMatch[1].match(/order:\s*([^\n]+)/) : null;
            const order = orderMatch ? orderMatch[1] : null;

            // get "tags : tag1 tag2 ... " as comma separated string
            const tagsMatch = specMatch ? specMatch[1].match(/tags:\s*([^\n]+)/) : null;
            const tags = tagsMatch ? tagsMatch[1].split(/\s+/).join(', ') : null;

            // summarize title, cluster, tags            
            const metaInfo = [title, tags, cluster, order].filter(Boolean).join(' | ');            

            tempDiv.innerHTML = metaInfo; // Use metaInfo instead of article.spec to avoid markdown syntax in meta description

            //console.log(tempDiv.textContent);
            const textContent = tempDiv.textContent || tempDiv.innerText || '';
            metaDescription.setAttribute('content', textContent.substring(0, 200));
        }

        return new ArticleView().appendArticles();
    }


    // BLOCK implementation of parser for MARKDOWN
    parse(article: string) {
        //console.log(article);
        const tokenizer = new Tokenizer(article);         

        // For debugging: log the AST node structure to the console
        console.log(tokenizer);        
            

        // find html element with id="article" in the DOM
        const virtualDOM = document.createElement('div');
        const result =  new Render(tokenizer.getAST(), virtualDOM);      
        // Find html element with id="article" in the DOM and append rendered content to it
        const rootElement = document.getElementById('article');    

        // Clear existing content in rootElement before appending new content
        if (rootElement) {
            rootElement.innerHTML = ''; // remove any existing content before appending new content
            rootElement.appendChild(virtualDOM); // Append the rendered result to the browser
        }

    }  


    async afterRender () { 

        document.title = this.article_title;

        // Parse and highlight article content
        try {
            this.parse(this.article.spec);            
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

        // Show sidebar only on large screens (keep hidden on small screens like right sidebar)
        sidebarEl.classList.add('lg:block');

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
