import Footer from './index';
import View from './view';

jest.mock('./view');

describe('Footer Controller', () => {
    let footerComponent: Footer;

    beforeEach(() => {
        footerComponent = new Footer();
    });

    describe('render', () => {
        it('should call view.appendFooter and return footer HTML string', async () => {
            const mockHTML = '<footer>Test Footer</footer>';
            (View.prototype.appendFooter as jest.Mock).mockReturnValue(mockHTML);

            const result = await footerComponent.render();

            expect(View.prototype.appendFooter).toHaveBeenCalled();
            expect(footerComponent.footer).toBe(mockHTML);
            expect(result).toBe(mockHTML);
        });
    });

    describe('afterRender', () => {
        it('should execute afterRender without throwing errors', () => {
            expect(() => footerComponent.afterRender()).not.toThrow();
        });
    });
});