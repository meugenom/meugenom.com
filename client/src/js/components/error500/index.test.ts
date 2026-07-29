import Error500 from './index';

describe('Error500 Controller', () => {
    let error500Component: Error500;

    beforeEach(() => {
        error500Component = new Error500();
    });

    describe('render', () => {
        it('should return HTML string with 500 error markup', async () => {
            const html = await error500Component.render();

            expect(html).toContain('class="error"');
            expect(html).toContain('data-text="500"');
            expect(html).toContain('500');
        });
    });

    describe('afterRender', () => {
        it('should execute afterRender without throwing any errors', () => {
            expect(() => error500Component.afterRender()).not.toThrow();
        });
    });
});