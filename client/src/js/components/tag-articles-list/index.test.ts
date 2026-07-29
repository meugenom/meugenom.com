import TagArticlesList from './index';
import Model from './model';
import View from './view';
import Utils from '../services/utils';

jest.mock('./model');
jest.mock('./view');
jest.mock('../services/utils');

describe('TagArticlesList Controller', () => {
    let controller: TagArticlesList;

    beforeEach(() => {
        controller = new TagArticlesList();
    });

    describe('render', () => {
        it('should extract tag parameter from URL, fetch specification, and return view HTML', async () => {
            const mockTag = 'testing';
            (Utils.prototype.parseRequestURL as jest.Mock).mockReturnValue({ id: mockTag });

            const mockArticlesSpec = { spec: [{ title: 'Testing Article' }] };
            const mockHTML = '<div class="tag-list">Tag Articles Markup</div>';

            (Model.prototype.getArticlesList as jest.Mock).mockResolvedValue(mockArticlesSpec as any);
            (View.prototype.appendTagArticlesList as jest.Mock).mockReturnValue(mockHTML);

            const result = await controller.render();

            expect(Utils.prototype.parseRequestURL).toHaveBeenCalled();
            expect(Model.prototype.getArticlesList).toHaveBeenCalledWith(mockTag);
            expect(View.prototype.appendTagArticlesList).toHaveBeenCalledWith(mockArticlesSpec);
            expect(result).toBe(mockHTML);
        });
    });

    describe('afterRender', () => {
        it('should execute afterRender without throwing errors', async () => {
            await expect(controller.afterRender()).resolves.toBeUndefined();
        });
    });
});