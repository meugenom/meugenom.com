import Model from './model';
import Service from '../services/services';

jest.mock('../services/services');

describe('Search Model', () => {
    let model: Model;

    beforeEach(() => {
        model = new Model();
    });

    it('should call Service.graphql with search term and return results', async () => {
        const mockTerm = 'typescript';
        const mockArticles = [
            { id: '1', title: 'TypeScript Basics', slug: 'ts-basics', date: '2026-07-01', tags: 'ts', cluster: '', order: '0' }
        ];

        (Service.prototype.graphql as jest.Mock).mockResolvedValue({
            searchArticles: mockArticles
        });

        const result = await model.searchArticles(mockTerm);

        expect(Service.prototype.graphql).toHaveBeenCalledWith(
            'json',
            '',
            expect.any(String),
            expect.any(String),
            { term: mockTerm }
        );
        expect(result).toEqual({ spec: mockArticles });
    });

    it('should log console error and throw when search service fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        (Service.prototype.graphql as jest.Mock).mockRejectedValue(new Error('Search failed'));

        await expect(model.searchArticles('error-term')).rejects.toThrow('Search failed');
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });
});