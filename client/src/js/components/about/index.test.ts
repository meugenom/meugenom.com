import About from './index';
import Model from './model';
import View from './view';
import Utils from '../services/utils';
import { convertMDtoHTML } from 'markdown-tailwind-css-compiler';

// Mock dependencies
jest.mock('./model');
jest.mock('./view');
jest.mock('../services/utils');
jest.mock('markdown-tailwind-css-compiler', () => ({
    convertMDtoHTML: jest.fn(),
}));

describe('About Controller', () => {
    let about: About;

    beforeEach(() => {
        about = new About();
    });

    describe('render', () => {
        it('should fetch raw markdown and return view HTML template', async () => {
            const mockMarkdown = '# About';
            const mockHTML = '<div id="about-article"></div>';

            (Model.prototype.getAboutArticle as jest.Mock).mockResolvedValue(mockMarkdown);
            (View.prototype.appendAbout as jest.Mock).mockResolvedValue(mockHTML);

            const result = await about.render();

            expect(about.rawMarkdown).toBe(mockMarkdown);
            expect(result).toBe(mockHTML);
        });
    });

    describe('afterRender', () => {
        it('should parse markdown, convert relative image paths, and inject HTML into DOM', async () => {
            // Setup DOM container
            document.body.innerHTML = `
                <div id="about-article"></div>
                <img class="lazy" data-src="test.png" />
            `;

            about.rawMarkdown = '# Header\n![img](image.jpg)';
            const parsedHTML = '<p>Header</p><img src="image.jpg" />';

            (convertMDtoHTML as jest.Mock).mockResolvedValue(parsedHTML);

            await about.afterRender();

            const rootElement = document.getElementById('about-article');
            
            // Relative path src="image.jpg" should be converted to src="/image.jpg"
            expect(rootElement?.innerHTML).toContain('src="/image.jpg"');
            expect(Utils.lazyLoadImage).toHaveBeenCalled();
        });

        it('should not throw or modify DOM if rawMarkdown is empty', async () => {
            document.body.innerHTML = '<div id="about-article">Original Content</div>';
            about.rawMarkdown = '';

            await about.afterRender();

            const rootElement = document.getElementById('about-article');
            expect(rootElement?.innerHTML).toBe('Original Content');
        });
    });
});