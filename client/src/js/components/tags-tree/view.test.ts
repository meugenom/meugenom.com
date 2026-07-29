import View from './view';

describe('TagsTree View', () => {
    let view: View;

    beforeEach(() => {
        view = new View();
    });

    it('should return fallback markup when tags is null or undefined', () => {
        const htmlNull = view.appendTags(null as any);
        expect(htmlNull).toContain('No tags available');

        const htmlUndefined = view.appendTags(undefined as any);
        expect(htmlUndefined).toContain('No tags available');
    });

    it('should render tags tree structure with navigation links', () => {
        const mockResponse = {
            data: [
                { name: 'JavaScript', slug: 'javascript', count: 12 },
                { name: 'TypeScript', slug: 'typescript', count: 8 }
            ]
        };

        const html = view.appendTags(mockResponse as any);

        expect(html).toContain('Tags Garten');

        // Check tag names rendered
        expect(html).toContain('JavaScript');
        expect(html).toContain('TypeScript');

        // Check links generated correctly
        expect(html).toContain('navigateLinkTo="/tag/JavaScript"');
        expect(html).toContain('navigateLinkTo="/tag/TypeScript"');
    });
});