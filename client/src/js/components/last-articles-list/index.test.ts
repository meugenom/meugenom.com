import LastArticlesList from './index';
import Model from './model';
import View from './view';

jest.mock('./model');
jest.mock('./view');

describe('LastArticlesList Controller', () => {
    let controller: LastArticlesList;

    beforeEach(() => {
        controller = new LastArticlesList();
    });

    describe('render', () => {
        it('should fetch last articles and return rendered view HTML', async () => {
            const mockArticles = [{ id: '1', title: 'Post 1' }];
            const mockHTML = '<div class="latest">Latest Posts Markup</div>';

            (Model.prototype.getLastArticlesList as jest.Mock).mockResolvedValue(mockArticles as any);
            (View.prototype.appendLastArticlesList as jest.Mock).mockReturnValue(mockHTML);

            const result = await controller.render();

            expect(Model.prototype.getLastArticlesList).toHaveBeenCalled();
            expect(View.prototype.appendLastArticlesList).toHaveBeenCalledWith(mockArticles);
            expect(controller.lastArticlesList).toEqual(mockArticles);
            expect(result).toBe(mockHTML);
        });
    });

    describe('afterRender', () => {
        it('should execute afterRender without throwing errors', () => {
            expect(() => controller.afterRender()).not.toThrow();
        });
    });
});