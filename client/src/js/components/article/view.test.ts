import ArticleView from './view';

describe('Article View', () => {
    let view: ArticleView;

    beforeEach(() => {
        view = new ArticleView();
    });

    it('should return HTML containing article and comments containers', () => {
        const html = view.appendArticles();

        expect(html).toContain('id="article"');
        expect(html).toContain('id="giscus-comments"');
        expect(html).toContain('class="giscus"');
    });
});