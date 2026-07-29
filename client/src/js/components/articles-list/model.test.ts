import Model from './model';
import Service from '../services/services';

// Mock the Service module to isolate network logic
jest.mock('../services/services');

describe('ArticlesList Model', () => {
    let model: Model;

    beforeEach(() => {
        model = new Model();
    });

    it('should fetch articles list via GraphQL service successfully', async () => {
        const mockData = [
            { id: '1', title: 'Article 1', slug: 'article-1', date: '2026-01-01', tags: 'ts', cluster: 'c1', order: '0' }
        ];
        (Service.prototype.graphql as jest.Mock).mockResolvedValue(mockData);

        const result = await model.getArticlesList();

        expect(Service.prototype.graphql).toHaveBeenCalledWith(
            'json',
            '',
            expect.any(String),
            expect.any(String),
            {}
        );
        expect(result).toEqual(mockData);
    });

    it('should throw an error when GraphQL request fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        (Service.prototype.graphql as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

        await expect(model.getArticlesList()).rejects.toThrow('Fetch failed');
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });
});