import View from './view';

describe('Search View', () => {
    let view: View;

    beforeEach(() => {
        view = new View();
    });

    it('should return empty state markup when results is null', () => {
        const html = view.appendSearchResults(null, 'jest');
        expect(html).toContain('No results found for');
        expect(html).toContain('"jest"');
    });

    it('should return empty state markup when search results list is empty', () => {
        const html = view.appendSearchResults({ spec: [] as any }, 'nonexistent');
        expect(html).toContain('No results found for');
        expect(html).toContain('"nonexistent"');
    });

    it('should render search results sorted by date, grouped by year/month with cluster series', () => {
        const mockResultsData = {
            spec: [
                {
                    id: '1',
                    title: 'Search Result Main',
                    date: '2026-07-10',
                    slug: 'search-main',
                    tags: 'frontend search',
                    cluster: 'search-cluster',
                    order: '0'
                },
                {
                    id: '2',
                    title: 'Search Result Follower',
                    date: '2026-07-11',
                    slug: 'search-follower',
                    tags: 'jest',
                    cluster: 'search-cluster',
                    order: '1'
                }
            ]
        };

        const html = view.appendSearchResults(mockResultsData as any, 'search');

        // Check header and result count badge
        expect(html).toContain('2 results for');
        expect(html).toContain('search');

        // Check year and month grouping
        expect(html).toContain('2026');
        expect(html).toContain('July');

        // Check main article star badge and title
        expect(html).toContain('★');
        expect(html).toContain('Search Result Main');

        // Check follower article order badge and title
        expect(html).toContain('1');
        expect(html).toContain('Search Result Follower');

        // Check tags formatting
        expect(html).toContain('#frontend');
        expect(html).toContain('#search');
    });
});