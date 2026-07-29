import View from './view';

describe('Navbar View', () => {
    let view: View;

    beforeEach(() => {
        view = new View();
    });

    it('should return HTML template with navbar structure, search input, and navigation links', () => {
        const html = view.appendNav();

        expect(html).toContain('id="_title"');
        expect(html).toContain('id="theme-toggle"');
        expect(html).toContain('id="nav-search"');
        expect(html).toContain('navigateLinkTo="/"');
        expect(html).toContain('navigateLinkTo="/about"');
        expect(html).toContain('navigateLinkTo="/articles"');
        expect(html).toContain('navigateLinkTo="/projects"');
    });
});