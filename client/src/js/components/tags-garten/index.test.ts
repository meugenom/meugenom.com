import TagsGarten from './index';
import Model from './model';
import View from './view';

jest.mock('./model');
jest.mock('./view');

describe('TagsGarten Controller', () => {
    let controller: TagsGarten;

    beforeEach(() => {
        controller = new TagsGarten();
    });

    describe('render', () => {
        it('should fetch tags and return rendered view HTML string', async () => {
            const mockTags = [{ name: 'jest', slug: 'jest' }];
            const mockHTML = '<div class="tags">Tags HTML</div>';

            (Model.prototype.getTags as jest.Mock).mockResolvedValue(mockTags as any);
            (View.prototype.appendTags as jest.Mock).mockReturnValue(mockHTML);

            const result = await controller.render();

            expect(Model.prototype.getTags).toHaveBeenCalled();
            expect(View.prototype.appendTags).toHaveBeenCalledWith(mockTags);
            expect(result).toBe(mockHTML);
        });
    });

    describe('afterRender', () => {
        it('should execute afterRender without throwing errors', () => {
            expect(() => controller.afterRender()).not.toThrow();
        });
    });
});