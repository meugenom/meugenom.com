import Model from './model';
import Service from '../services/services';

jest.mock('../services/services');

describe('TagsTree Model', () => {
    let model: Model;

    beforeEach(() => {
        model = new Model();
    });

    it('should fetch tags data via GraphQL service successfully', async () => {
        const mockTagsData = [{ name: 'Frontend', slug: 'frontend', count: 5 }];
        (Service.prototype.graphql as jest.Mock).mockResolvedValue(mockTagsData);

        const result = await model.getTags();

        expect(Service.prototype.graphql).toHaveBeenCalledWith(
            'json',
            '',
            expect.any(String),
            expect.any(String),
            {}
        );
        expect(result).toEqual(mockTagsData);
    });

    it('should log error and throw when GraphQL request fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        (Service.prototype.graphql as jest.Mock).mockRejectedValue(new Error('Tags tree fetch error'));

        await expect(model.getTags()).rejects.toThrow('Tags tree fetch error');
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });
});