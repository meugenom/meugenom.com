import View from './view';

describe('Error502 View', () => {
    let view: View;

    beforeEach(() => {
        view = new View();
    });

    it('should return HTML string with 502 error markup', async () => {
        const html = await view.appendPage();

        expect(html).toContain('class="error"');
        expect(html).toContain('data-text="502"');
        expect(html).toContain('502');
    });
});