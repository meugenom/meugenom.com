import Model from './model';
import Service from '../services/services';

// Mock the Service module to isolate network logic
jest.mock('../services/services');

describe('Article Model', () => {
    let model: Model;

    beforeEach(() => {
        model = new Model();
    });

    it('should fetch article specification by slug successfully', async () => {
        const mockSlug = 'test-article-slug';
        const mockResponseSpec = '---\ntitle: "Test Article"\n---\n# Article Content';

        (Service.prototype.graphql as jest.Mock).mockResolvedValue({
            getAllSpecificationTextByArticleSlug: mockResponseSpec,
        });

        const result = await model.getArticle(mockSlug);

        expect(Service.prototype.graphql).toHaveBeenCalledWith(
            'json',
            '',
            expect.any(String),
            expect.any(String),
            { slug: mockSlug }
        );
        expect(result).toEqual({ spec: mockResponseSpec });
    });

    it('should throw an error when GraphQL service fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        (Service.prototype.graphql as jest.Mock).mockRejectedValue(new Error('GraphQL Error'));

        await expect(model.getArticle('failed-slug')).rejects.toThrow('GraphQL Error');
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });
});