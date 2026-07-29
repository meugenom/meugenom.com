import SocialLinks from './index';
import View from './view';

jest.mock('./view');

describe('SocialLinks Controller', () => {
    let controller: SocialLinks;

    beforeEach(() => {
        controller = new SocialLinks();
    });

    describe('render', () => {
        it('should call view.appendSocialLinks and return HTML string', async () => {
            const mockHTML = '<div class="social_links">Mock Social Links</div>';
            (View.prototype.appendSocialLinks as jest.Mock).mockReturnValue(mockHTML);

            const result = await controller.render();

            expect(View.prototype.appendSocialLinks).toHaveBeenCalled();
            expect(controller.socialLinks).toBe(mockHTML);
            expect(result).toBe(mockHTML);
        });
    });

    describe('afterRender', () => {
        it('should execute afterRender without throwing errors', () => {
            expect(() => controller.afterRender()).not.toThrow();
        });
    });
});