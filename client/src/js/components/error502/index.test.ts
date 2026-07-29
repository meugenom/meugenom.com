import Error502 from './index';
import View from './view';

jest.mock('./view');

describe('Error502 Controller', () => {
    let error502Component: Error502;

    beforeEach(() => {
        error502Component = new Error502();
    });

    describe('render', () => {
        it('should call view.appendPage and return HTML string', async () => {
            const mockHTML = '<div class="error" data-text="502">502</div>';
            (View.prototype.appendPage as jest.Mock).mockResolvedValue(mockHTML);

            const result = await error502Component.render();

            expect(View.prototype.appendPage).toHaveBeenCalled();
            expect(error502Component.footer).toBe(mockHTML);
            expect(result).toBe(mockHTML);
        });
    });

    describe('afterRender', () => {
        it('should execute afterRender without throwing any errors', () => {
            expect(() => error502Component.afterRender()).not.toThrow();
        });
    });
});