import SideBarRight from './index';
import View from './view';

jest.mock('./view');

describe('SideBarRight Controller', () => {
    let controller: SideBarRight;

    beforeEach(() => {
        controller = new SideBarRight();
    });

    describe('render', () => {
        it('should call view.appendSideBarRight and return sidebar HTML', async () => {
            const mockHTML = '<div class="w-full sidebar">Sidebar Content</div>';
            (View.prototype.appendSideBarRight as jest.Mock).mockResolvedValue(mockHTML);

            const result = await controller.render();

            expect(View.prototype.appendSideBarRight).toHaveBeenCalled();
            expect(result).toBe(mockHTML);
        });
    });

    describe('afterRender', () => {
        it('should execute afterRender without throwing errors', () => {
            expect(() => controller.afterRender()).not.toThrow();
        });
    });
});