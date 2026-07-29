import Model from './model';
import Service from '../services/services';

jest.mock('../services/services');

describe('TagArticlesList Model', () => {
    let model: Model;

    beforeEach(() => {
        model = new Model();
    });

    it('should fetch articles by tag via GraphQL service successfully', async () => {
        const mockTag = 'typescript';
        const mockArticles = [
            { id: '1', title: 'TS Guide', slug: 'ts-guide', date: '2026-07-01', tags: 'typescript', cluster: '', order: '0' }
        ];

        (Service.prototype.graphql as jest.Mock).mockResolvedValue({
            articlesListByTag: mockArticles
        });

        const result = await model.getArticlesList(mockTag);

        expect(Service.prototype.graphql).toHaveBeenCalledWith(
            'json',
            '',
            expect.any(String),
            expect.any(String),
            { tag: mockTag }
        );
        expect(result).toEqual({ spec: mockArticles });
    });

    it('should log error and throw when GraphQL service request fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        (Service.prototype.graphql as jest.Mock).mockRejectedValue(new Error('Tag fetch error'));

        await expect(model.getArticlesList('failing-tag')).rejects.toThrow('Tag fetch error');
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });
});