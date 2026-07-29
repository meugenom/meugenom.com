import Search from './index';
import Model from './model';
import View from './view';
import Utils from '../services/utils';

jest.mock('./model');
jest.mock('./view');
jest.mock('../services/utils');

describe('Search Controller', () => {
    let controller: Search;

    beforeEach(() => {
        controller = new Search();
    });

    describe('render', () => {
        it('should return prompt HTML when search term length is less than 3 characters', async () => {
            (Utils.prototype.parseRequestURL as jest.Mock).mockReturnValue({ id: 'ab' });

            const result = await controller.render();

            expect(result).toContain('Enter at least 3 characters to search.');
            expect(Model.prototype.searchArticles).not.toHaveBeenCalled();
        });

        it('should decode URL term, fetch results from model, and return rendered view markup', async () => {
            const encodedTerm = 'react%20hooks';
            (Utils.prototype.parseRequestURL as jest.Mock).mockReturnValue({ id: encodedTerm });

            const mockResults = { spec: [{ title: 'React Hooks Article' }] };
            const mockHTML = '<div>Search Results Markup</div>';

            (Model.prototype.searchArticles as jest.Mock).mockResolvedValue(mockResults);
            (View.prototype.appendSearchResults as jest.Mock).mockReturnValue(mockHTML);

            const result = await controller.render();

            expect(Model.prototype.searchArticles).toHaveBeenCalledWith('react hooks');
            expect(View.prototype.appendSearchResults).toHaveBeenCalledWith(mockResults, 'react hooks');
            expect(result).toBe(mockHTML);
        });
    });

    describe('afterRender', () => {
        it('should execute afterRender without throwing errors', async () => {
            await expect(controller.afterRender()).resolves.toBeUndefined();
        });
    });
});