import View from './view';
import Config from '../../config';

describe('ArticlesList View', () => {
    let view: View;

    beforeEach(() => {
        view = new View();
    });

    it('should update document title and return fallback HTML when articlesList is null', async () => {
        const html = await view.appendArticlesList(null as any);

        expect(document.title).toBe(`${Config.siteName} | Articles`);
        expect(html).toContain('No articles available');
        expect(html).toContain('/Error502');
    });

    it('should update document title and return fallback HTML when articlesList is undefined', async () => {
        const html = await view.appendArticlesList(undefined as any);

        expect(document.title).toBe(`${Config.siteName} | Articles`);
        expect(html).toContain('No articles available');
    });

    it('should group entry articles by year and month and render cluster series', async () => {
        // Object structure matching GraphQL response where articles are grouped under an object key
        const mockArticlesData = {
            articles: [
                {
                    id: '1',
                    title: 'Entry Article 2026',
                    date: '2026-05-15',
                    slug: 'entry-2026',
                    tags: 'typescript testing',
                    cluster: 'cluster-a',
                    order: '0'
                },
                {
                    id: '2',
                    title: 'Follower Article 1',
                    date: '2026-05-16',
                    slug: 'follower-1',
                    tags: 'jest',
                    cluster: 'cluster-a',
                    order: '1'
                },
                {
                    id: '3',
                    title: 'Entry Article 2025',
                    date: '2025-11-20',
                    slug: 'entry-2025',
                    tags: 'javascript',
                    cluster: 'cluster-b',
                    order: '0'
                }
            ]
        };

        const html = await view.appendArticlesList(mockArticlesData as any);

        expect(document.title).toBe(`${Config.siteName} | Articles`);

        // Check year group headers
        expect(html).toContain('2026');
        expect(html).toContain('2025');

        // Check month group headers
        expect(html).toContain('May');
        expect(html).toContain('November');

        // Check main article badge (star)
        expect(html).toContain('★');

        // Check follower article order badge
        expect(html).toContain('1');

        // Check navigation link attributes
        expect(html).toContain('navigateLinkTo="/article/entry-2026"');
        expect(html).toContain('navigateLinkTo="/article/follower-1"');
        expect(html).toContain('navigateLinkTo="/tag/typescript"');
    });
});