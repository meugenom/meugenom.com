import View from './view';
import ProjectsListModel from '../projects-list/model';
import ProjectListView from '../projects-list/view';
import LastArticlesListModel from '../last-articles-list/model';
import LastArticlesListView from '../last-articles-list/view';
import Config from '../../config';

// Mock sub-component models and views
jest.mock('../projects-list/model');
jest.mock('../projects-list/view');
jest.mock('../last-articles-list/model');
jest.mock('../last-articles-list/view');

describe('Home View', () => {
    let view: View;

    beforeEach(() => {
        view = new View();
    });

    it('should update document title and combine rendered last articles and projects markup', async () => {
        const mockProjects = [{ name: 'Test Project' }];
        const mockArticles = [{ title: 'Test Article' }];

        (ProjectsListModel.prototype.getProjects as jest.Mock).mockResolvedValue(mockProjects);
        (LastArticlesListModel.prototype.getLastArticlesList as jest.Mock).mockResolvedValue(mockArticles);

        (LastArticlesListView.prototype.appendLastArticlesList as jest.Mock).mockResolvedValue('<div id="last-articles">Articles Section</div>');
        (ProjectListView.prototype.appendProjectsList as jest.Mock).mockResolvedValue('<div id="projects">Projects Section</div>');

        const html = await view.appendHome();

        expect(document.title).toBe(`${Config.siteName} | Home`);
        expect(html).toContain('<div id="last-articles">Articles Section</div>');
        expect(html).toContain('<div id="projects">Projects Section</div>');
    });
});