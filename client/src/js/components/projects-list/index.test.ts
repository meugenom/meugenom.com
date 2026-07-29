import ProjectsList from './index';
import Model from './model';
import View from './view';

jest.mock('./model');
jest.mock('./view');

describe('ProjectsList Controller', () => {
    let controller: ProjectsList;

    beforeEach(() => {
        controller = new ProjectsList();
    });

    describe('render', () => {
        it('should fetch projects list and return rendered view HTML string', async () => {
            const mockProjects = [{ name: 'Awesome Project' }];
            const mockHTML = '<div class="projects-grid">Projects Grid</div>';

            (Model.prototype.getProjects as jest.Mock).mockResolvedValue(mockProjects as any);
            (View.prototype.appendProjectsList as jest.Mock).mockResolvedValue(mockHTML);

            const result = await controller.render();

            expect(Model.prototype.getProjects).toHaveBeenCalled();
            expect(View.prototype.appendProjectsList).toHaveBeenCalledWith(mockProjects);
            expect(controller.projects).toEqual(mockProjects);
            expect(result).toBe(mockHTML);
        });
    });

    describe('afterRender', () => {
        it('should execute afterRender without throwing errors', () => {
            expect(() => controller.afterRender()).not.toThrow();
        });
    });
});