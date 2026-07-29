import TagsTree from './index';
import Model from './model';
import View from './view';

jest.mock('./model');
jest.mock('./view');

describe('TagsTree Controller', () => {
    let controller: TagsTree;

    beforeEach(() => {
        controller = new TagsTree();
    });

    describe('render', () => {
        it('should fetch tags data and return rendered view HTML string', async () => {
            const mockData = [{ name: 'Architecture', slug: 'architecture' }];
            const mockHTML = '<div class="tags-tree">Tags Tree HTML</div>';

            (Model.prototype.getTags as jest.Mock).mockResolvedValue(mockData as any);
            (View.prototype.appendTags as jest.Mock).mockReturnValue(mockHTML);

            const result = await controller.render();

            expect(Model.prototype.getTags).toHaveBeenCalled();
            expect(View.prototype.appendTags).toHaveBeenCalledWith(mockData);
            expect(result).toBe(mockHTML);
        });
    });

    describe('afterRender', () => {
        it('should execute afterRender without throwing errors', () => {
            expect(() => controller.afterRender()).not.toThrow();
        });
    });
});