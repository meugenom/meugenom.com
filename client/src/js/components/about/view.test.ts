import View from './view';
import Config from '../../config';

describe('About View', () => {
    let view: View;

    beforeEach(() => {
        view = new View();
    });

    it('should set document title and return correct HTML string', async () => {
        const html = await view.appendAbout();

        // Check document title update
        expect(document.title).toBe(`${Config.siteName} | About`);

        // Check DOM template output
        expect(html).toContain('id="about-article"');
        expect(html).toContain('markdown-content-wraper');
    });
});