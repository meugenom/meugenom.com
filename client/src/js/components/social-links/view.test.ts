import View from './view';
import Config from '../../config';

describe('SocialLinks View', () => {
    let view: View;

    beforeEach(() => {
        view = new View();
    });

    it('should return HTML containing social links markup with correct URLs from Config', () => {
        const html = view.appendSocialLinks();

        expect(html).toContain('class="social_links"');
        expect(html).toContain(Config.socialLinks.github);
        expect(html).toContain(Config.socialLinks.coffee);
        expect(html).toContain(Config.socialLinks.linkedin);

        expect(html).toContain('github_no_touch');
        expect(html).toContain('coffee_no_touch');
        expect(html).toContain('linkedin_no_touch');
    });
});