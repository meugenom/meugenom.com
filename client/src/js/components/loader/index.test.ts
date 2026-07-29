import Loader from './index';

describe('Loader Controller', () => {
    let loaderController: Loader;

    beforeEach(() => {
        loaderController = new Loader();
    });

    describe('render', () => {
        it('should create and return DOM container element with loader spinner child', async () => {
            const container = await loaderController.render();

            expect(container).toBeInstanceOf(HTMLDivElement);
            expect(container.classList.contains('loader_container')).toBe(true);

            // Check applied inline CSS styles
            expect(container.style.left).toBe('50%');
            expect(container.style.top).toBe('30%');
            expect(container.style.position).toBe('absolute');

            // Check nested loader spinner element
            const spinner = container.querySelector('.loader');
            expect(spinner).not.toBeNull();
            expect(spinner?.classList.contains('loader')).toBe(true);
        });
    });

    describe('afterRender', () => {
        it('should execute afterRender without throwing errors', () => {
            expect(() => loaderController.afterRender()).not.toThrow();
        });
    });
});