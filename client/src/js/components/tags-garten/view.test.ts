import View from './view';

describe('TagsGarten View', () => {
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

    it('should group tags by uppercase first letter, remove duplicates, and sort alphabetically', () => {
        const mockTagsResponse = {
            data: [
                { name: 'typescript', slug: 'typescript' },
                { name: 'Testing', slug: 'testing' },
                { name: 'testing', slug: 'testing' }, // duplicate name
                { name: 'angular', slug: 'angular' }
            ]
        };

        const html = view.appendTags(mockTagsResponse as any);

        expect(html).toContain('Tags Garten');

        // Check letter headers present
        expect(html).toContain('>A<');
        expect(html).toContain('>T<');

        // Check alphabetical sorting: letter A must come before letter T
        const indexA = html.indexOf('>A<');
        const indexT = html.indexOf('>T<');
        expect(indexA).toBeLessThan(indexT);

        // Check tag navigation links
        expect(html).toContain('navigateLinkTo="/tag/angular"');
        expect(html).toContain('navigateLinkTo="/tag/typescript"');
        expect(html).toContain('navigateLinkTo="/tag/Testing"');
    });
});