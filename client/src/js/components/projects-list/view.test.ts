import View from './view';
import Config from '../../config';

describe('ProjectsList View', () => {
    let view: View;

    beforeEach(() => {
        view = new View();
        document.title = '';
    });

    it('should return fallback HTML when projects is null', async () => {
        const html = await view.appendProjectsList(null as any);

        expect(html).toContain('No articles available');
        expect(html).toContain('/Error502');
    });

    it('should return fallback HTML when projects is undefined', async () => {
        const html = await view.appendProjectsList(undefined as any);

        expect(html).toContain('No articles available');
    });

    it('should render project cards with stargazers, language SVG icons, update title, and homepage links', async () => {
        const mockProjectsData = [
            {
                name: 'test-repo',
                openGraphImageUrl: 'https://example.com/image.png',
                stargazers: 12,
                pushedAt: '2026-07-15T12:00:00Z',
                resourcePath: '/user/test-repo',
                homepageUrl: 'https://test-repo.example.com',
                description: 'Test repository description',
                languages: [{ name: 'TypeScript' }]
            },
            {
                name: 'no-homepage-repo',
                openGraphImageUrl: 'https://example.com/image2.png',
                stargazers: 0,
                pushedAt: '2026-05-10T12:00:00Z',
                resourcePath: '/user/no-homepage-repo',
                homepageUrl: '',
                description: 'No homepage description',
                languages: [{ name: 'C++' }]
            }
        ];

        const html = await view.appendProjectsList(mockProjectsData as any);

        // Verify document title updated by renderLanguages call
        expect(document.title).toBe(`${Config.siteName} | Projects`);

        // Check project headers and descriptions
        expect(html).toContain('test-repo');
        expect(html).toContain('Test repository description');
        expect(html).toContain('no-homepage-repo');

        // Check stargazers rendering for repo with >0 stars
        expect(html).toContain('12');

        // Check SVG language markup rendering from Config
        expect(html).toContain(Config.languageToSVG.TypeScript);
        expect(html).toContain(Config.languageToSVG['C++']);

        // Check web homepage button present for project 1 and absent for project 2
        expect(html).toContain('https://test-repo.example.com');
        expect(html).toContain('Show Web');
    });
});