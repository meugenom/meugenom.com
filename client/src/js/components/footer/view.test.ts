import View from './view';
import Config from '../../config';

describe('Footer View', () => {
    let view: View;

    beforeEach(() => {
        view = new View();
    });

    it('should return HTML containing current year and site name', () => {
        const currentYear = new Date().getFullYear().toString();
        const html = view.appendFooter();

        expect(html).toContain('<footer');
        expect(html).toContain(Config.siteName);
        expect(html).toContain(currentYear);
        expect(html).toContain('class="social-buttons"');
    });
});