import Model from './model';
import Service from '../services/services';

jest.mock('../services/services');

describe('LastArticlesList Model', () => {
    let model: Model;

    beforeEach(() => {
        model = new Model();
    });

    it('should fetch last articles list via GraphQL service successfully', async () => {
        const mockData = [
            { id: '1', title: 'Latest Post 1', slug: 'post-1', date: '2026-07-01', tags: 'ts', cluster: 'c1', order: '0' }
        ];
        (Service.prototype.graphql as jest.Mock).mockResolvedValue(mockData);

        const result = await model.getLastArticlesList();

        expect(Service.prototype.graphql).toHaveBeenCalledWith(
            'json',
            '',
            expect.any(String),
            expect.any(String),
            {}
        );
        expect(result).toEqual(mockData);
    });

    it('should log error and throw when GraphQL service fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        (Service.prototype.graphql as jest.Mock).mockRejectedValue(new Error('Network failure'));

        await expect(model.getLastArticlesList()).rejects.toThrow('Network failure');
        expect(consoleSpy).toHaveBeenCalledWith('Error retrieving articles list:', expect.any(Error));

        consoleSpy.mockRestore();
    });
});