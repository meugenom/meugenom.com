import Model from './model';
import Service from '../services/services';
import Config from '../../config';

jest.mock('../services/services');

describe('ProjectsList Model', () => {
    let model: Model;

    beforeEach(() => {
        model = new Model();
    });

    it('should fetch github projects via Service.graphql successfully', async () => {
        const mockProjects = [
            { name: 'meugenom-client', stargazers: 5, languages: [{ name: 'TypeScript' }] }
        ];
        (Service.prototype.graphql as jest.Mock).mockResolvedValue({
            githubProjects: mockProjects
        });

        const result = await model.getProjects();

        expect(Service.prototype.graphql).toHaveBeenCalledWith(
            'json',
            undefined,
            expect.any(String),
            expect.any(String),
            {}
        );
        expect(result).toEqual(mockProjects);
    });

    it('should return correct month abbreviation via getMonth method', () => {
        expect(model.getMonth(0)).toBe(Config.months[0]);
        expect(model.getMonth(5)).toBe(Config.months[5]);
    });
});