import View from './view';

describe('LastArticlesList View', () => {
    let view: View;

    beforeEach(() => {
        view = new View();
    });

    it('should return fallback HTML when lastArticlesList is null', () => {
        const html = view.appendLastArticlesList(null as any);
        expect(html).toContain('No articles available');
        expect(html).toContain('/Error502');
    });

    it('should return fallback HTML when lastArticlesList is undefined', () => {
        const html = view.appendLastArticlesList(undefined as any);
        expect(html).toContain('No articles available');
    });

it('should sort articles descending by date, render main entry star badge and nested series', () => {
        const mockResponse = {
            data: [
                {
                    id: '1',
                    title: 'Older Article',
                    date: '2026-01-10',
                    slug: 'older-article',
                    tags: 'javascript',
                    cluster: 'cluster-a',
                    order: '0'
                },
                {
                    id: '2',
                    title: 'Newest Main Article',
                    date: '2026-07-20',
                    slug: 'newest-main',
                    tags: 'typescript jest',
                    cluster: 'cluster-b',
                    order: '0'
                },
                {
                    id: '3',
                    title: 'Follower of Newest',
                    date: '2026-07-21',
                    slug: 'follower-newest',
                    tags: 'testing',
                    cluster: 'cluster-b',
                    order: '1'
                }
            ]
        };

        const html = view.appendLastArticlesList(mockResponse as any);

        // Header section check
        expect(html).toContain('Latest Posts');

        // Main articles star badge check
        expect(html).toContain('★');

        // Check follower order number
        expect(html).toContain('1');

        // Check tag formatting with # for main entry articles
        expect(html).toContain('#typescript');
        expect(html).toContain('#jest');
        expect(html).toContain('#javascript');

        // Check date rendering
        expect(html).toContain('2026-07-20');

        // Order check: Newest article should appear before older article in HTML
        const newestIndex = html.indexOf('Newest Main Article');
        const olderIndex = html.indexOf('Older Article');
        expect(newestIndex).toBeLessThan(olderIndex);
    });

    it('should render orphan follower article at top-level when its entry article is missing', () => {
        const mockResponse = {
            data: [
                {
                    id: '10',
                    title: 'Orphan Article',
                    date: '2026-06-01',
                    slug: 'orphan-article',
                    tags: 'misc',
                    cluster: 'missing-cluster',
                    order: '2'
                }
            ]
        };

        const html = view.appendLastArticlesList(mockResponse as any);

        expect(html).toContain('Orphan Article');
        expect(html).toContain('2'); // Order badge for orphan
    });
});