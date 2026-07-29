import Model from './model';
import Service from '../services/services';

// Mock the Service module to avoid actual network calls
jest.mock('../services/services');

describe('About Model', () => {
    let model: Model;

    beforeEach(() => {
        model = new Model();
    });

    it('should return article content on successful GraphQL request', async () => {
        const mockArticleText = '# About Me\nThis is a test content.';
        
        // Mock GraphQL service response
        (Service.prototype.graphql as jest.Mock).mockResolvedValue({
            getAllSpecificationTextByArticleSlug: mockArticleText,
        });

        const result = await model.getAboutArticle();

        expect(Service.prototype.graphql).toHaveBeenCalledWith(
            'json',
            '',
            expect.any(String),
            expect.any(String),
            { slug: 'about' }
        );
        expect(result).toBe(mockArticleText);
    });

    it('should return empty string when GraphQL service throws an error', async () => {
        // Mock GraphQL service rejection
        (Service.prototype.graphql as jest.Mock).mockRejectedValue(new Error('Network error'));
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        const result = await model.getAboutArticle();

        expect(result).toBe('');
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});