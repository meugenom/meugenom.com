import Article from './index';
import Model from './model';
import Utils from '../services/utils';
import { convertMDtoHTML } from 'markdown-tailwind-css-compiler';

// Mock required modules
jest.mock('./model');
jest.mock('../services/utils');
jest.mock('markdown-tailwind-css-compiler', () => ({
    convertMDtoHTML: jest.fn(),
}));

describe('Article Controller', () => {
    let articleController: Article;

    beforeEach(() => {
        // Setup initial DOM environment
        document.body.innerHTML = `
            <meta name="description" content="" />
            <div id="page"></div>
            <div id="article"></div>
            <div id="side-bar-left"></div>
            <div id="giscus-comments"></div>
        `;

        articleController = new Article();

        // Default mock for request parsing
        (Utils.prototype.parseRequestURL as jest.Mock).mockReturnValue({
            id: 'sample-article',
        });
    });

    describe('render', () => {
        it('should parse frontmatter metadata and update meta description tag', async () => {
            // Frontmatter with unquoted cluster and tags as processed by index.ts regexes
            const mockSpec = `---
title: "My Article Title"
cluster: tech
order: 1
tags: ts jest
---
Article content body`;

            (Model.prototype.getArticle as jest.Mock).mockResolvedValue({ spec: mockSpec });

            await articleController.render();

            const metaDescription = document.querySelector('meta[name="description"]');
            expect(metaDescription?.getAttribute('content')).toBe('My Article Title | ts, jest | tech | 1');
        });
    });

    describe('afterRender', () => {
        it('should render HTML content into DOM and build Table of Contents', async () => {
            const mockMarkdownSpec = '# Heading 1\n## Heading 2';
            (Model.prototype.getArticle as jest.Mock).mockResolvedValue({ spec: mockMarkdownSpec });

            // Setup article instance state
            await articleController.render();

            const parsedHTML = '<h1 id="heading-1">Heading 1</h1><h2>Heading 2</h2>';
            (convertMDtoHTML as jest.Mock).mockResolvedValue(parsedHTML);

            await articleController.afterRender();

            const articleEl = document.getElementById('article');
            const sidebarEl = document.getElementById('side-bar-left');

            // Article DOM should contain parsed HTML
            expect(articleEl?.innerHTML).toContain('Heading 1');

            // TOC should be generated and placed in sidebar
            expect(sidebarEl?.innerHTML).toContain('Heading 2');
            expect(sidebarEl?.classList.contains('lg:block')).toBe(true);
        });

        it('should append giscus comments script element', async () => {
            (Model.prototype.getArticle as jest.Mock).mockResolvedValue({ spec: '--- \n--- \nBody' });
            (convertMDtoHTML as jest.Mock).mockResolvedValue('<p>Body</p>');

            await articleController.render();
            await articleController.afterRender();

            // Allow requestAnimationFrame callbacks to run
            await new Promise((resolve) => setTimeout(resolve, 50));

            const giscusComments = document.getElementById('giscus-comments');
            const script = giscusComments?.querySelector('script');

            expect(script).not.toBeNull();
            expect(script?.src).toBe('https://giscus.app/client.js');
        });
    });
});