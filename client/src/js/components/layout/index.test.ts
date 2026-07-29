import Layout from './index';
import View from './view';

jest.mock('./view');

describe('Layout Controller', () => {
    let layoutController: Layout;

    beforeEach(() => {
        layoutController = new Layout();
    });

    describe('getHTMLElement', () => {
        it('should call view.getLayoutHTMLElement and return HTMLElement', async () => {
            const mockContainer = document.createElement('div');
            mockContainer.id = 'layout';
            (View.prototype.getLayoutHTMLElement as jest.Mock).mockResolvedValue(mockContainer);

            const result = await layoutController.getHTMLElement();

            expect(View.prototype.getLayoutHTMLElement).toHaveBeenCalled();
            expect(result).toBe(mockContainer);
        });
    });

    describe('afterRender', () => {
        it('should execute afterRender without throwing errors', () => {
            expect(() => layoutController.afterRender()).not.toThrow();
        });
    });
});