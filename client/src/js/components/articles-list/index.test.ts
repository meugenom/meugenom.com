import ArticlesList from './index';
import Model from './model';
import View from './view';

jest.mock('./model');
jest.mock('./view');

describe('ArticlesList Controller', () => {
    let controller: ArticlesList;

    beforeEach(() => {
        controller = new ArticlesList();
    });

    it('should fetch articles list and return view HTML on render', async () => {
        const mockArticles = [{ id: '1', title: 'Test Article' }];
        const mockHTML = '<div class="articles-list">Test HTML</div>';

        (Model.prototype.getArticlesList as jest.Mock).mockResolvedValue(mockArticles as any);
        (View.prototype.appendArticlesList as jest.Mock).mockResolvedValue(mockHTML);

        const result = await controller.render();

        expect(Model.prototype.getArticlesList).toHaveBeenCalled();
        expect(View.prototype.appendArticlesList).toHaveBeenCalledWith(mockArticles);
        expect(controller.articlesList).toEqual(mockArticles);
        expect(result).toBe(mockHTML);
    });

    it('should run afterRender without throwing errors', () => {
        expect(() => controller.afterRender()).not.toThrow();
    });
});