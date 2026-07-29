import Query from './query';
import Config from '../../config';

describe('Query Config Service', () => {
    it('should export Query object with host matching Config.localHost', () => {
        expect(Query.lastArticlesList.host).toBe(Config.localHost);
        expect(Query.articlesList.host).toBe(Config.localHost);
        expect(Query.tagsList.host).toBe(Config.localHost);
        expect(Query.projectsList.host).toBe(Config.localHost);
    });

    it('should contain correct GraphQL query strings', () => {
        expect(Query.lastArticlesList.query).toContain('lastArticlesList');
        expect(Query.articlesList.query).toContain('articlesList');
        expect(Query.tagsList.query).toContain('tagsList');
        expect(Query.projectsList.query).toContain('githubProjects');
        expect(Query.searchArticles.query).toContain('searchArticles');
        expect(Query.getAllSpecificationTextByArticleSlug.query).toContain('getAllSpecificationTextByArticleSlug');
    });
});