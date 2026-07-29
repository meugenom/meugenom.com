import Home from './index';
import View from './view';

jest.mock('./view');

describe('Home Controller', () => {
    let homeController: Home;

    beforeEach(() => {
        homeController = new Home();
    });

    describe('render', () => {
        it('should call view.appendHome and return rendered HTML content', async () => {
            const mockHTML = '<div>Combined Home Content</div>';
            (View.prototype.appendHome as jest.Mock).mockResolvedValue(mockHTML);

            const result = await homeController.render();

            expect(View.prototype.appendHome).toHaveBeenCalled();
            expect(result).toBe(mockHTML);
        });
    });

    describe('afterRender', () => {
        it('should execute afterRender without throwing errors', () => {
            expect(() => homeController.afterRender()).not.toThrow();
        });
    });
});