import View from './view';

describe('TagArticlesList View', () => {
    let view: View;

    beforeEach(() => {
        view = new View();
    });

    it('should return empty state markup when articlesList is null', () => {
        const html = view.appendTagArticlesList(null as any);
        expect(html).toContain('No writings found');
    });

    it('should return empty state markup when articles list array is empty', () => {
        const html = view.appendTagArticlesList({ spec: [] as any });
        expect(html).toContain('No writings found');
    });

    it('should render tag articles grouped by year and month with cluster followers', () => {
        const mockTagData = {
            spec: [
                {
                    id: '1',
                    title: 'Tagged Entry Article',
                    date: '2026-06-15',
                    slug: 'tagged-entry',
                    tags: 'javascript testing',
                    cluster: 'cluster-tag',
                    order: '0'
                },
                {
                    id: '2',
                    title: 'Tagged Follower Article',
                    date: '2026-06-16',
                    slug: 'tagged-follower',
                    tags: 'testing',
                    cluster: 'cluster-tag',
                    order: '1'
                }
            ]
        };

        const html = view.appendTagArticlesList(mockTagData as any);

        expect(html).toContain('Found');
        expect(html).toContain('2026');
        expect(html).toContain('June');

        // Main article badge and title
        expect(html).toContain('★');
        expect(html).toContain('Tagged Entry Article');

        // Follower article order badge and title
        expect(html).toContain('1');
        expect(html).toContain('Tagged Follower Article');

        // Tags check
        expect(html).toContain('#javascript');
        expect(html).toContain('#testing');
    });
});