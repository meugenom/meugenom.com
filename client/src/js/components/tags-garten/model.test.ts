import Model from './model';
import Service from '../services/services';

jest.mock('../services/services');

describe('TagsGarten Model', () => {
    let model: Model;

    beforeEach(() => {
        model = new Model();
    });

    it('should fetch tags list via GraphQL service successfully', async () => {
        const mockTags = [{ name: 'React', slug: 'react' }];
        (Service.prototype.graphql as jest.Mock).mockResolvedValue(mockTags);

        const result = await model.getTags();

        expect(Service.prototype.graphql).toHaveBeenCalledWith(
            'json',
            '',
            expect.any(String),
            expect.any(String),
            {}
        );
        expect(result).toEqual(mockTags);
    });

    it('should log error and throw when GraphQL request fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        (Service.prototype.graphql as jest.Mock).mockRejectedValue(new Error('Tags fetch error'));

        await expect(model.getTags()).rejects.toThrow('Tags fetch error');
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });
});