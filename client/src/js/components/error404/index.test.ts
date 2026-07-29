import Error404 from './index';

describe('Error404 Controller', () => {
    let error404Component: Error404;

    beforeEach(() => {
        error404Component = new Error404();
    });

    describe('render', () => {
        it('should return HTML string with 404 error markup', async () => {
            const html = await error404Component.render();

            expect(html).toContain('class="error"');
            expect(html).toContain('data-text="404"');
            expect(html).toContain('404');
        });
    });

    describe('afterRender', () => {
        it('should execute afterRender without throwing any errors', () => {
            expect(() => error404Component.afterRender()).not.toThrow();
        });
    });
});