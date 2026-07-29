import Navbar from './index';
import View from './view';

jest.mock('./view');

describe('Navbar Controller', () => {
    let navbar: Navbar;

    beforeEach(() => {
        // Setup mock DOM required for Navbar interactions
        document.body.innerHTML = `
            <div id="_title"></div>
            <a id="theme-toggle">
                <div class="sl_social"><i class="bi bi-moon-fill"></i></div>
            </a>
            <input id="nav-search" type="text" />
        `;

        document.documentElement.className = '';
        localStorage.clear();
        navbar = new Navbar();
    });

    describe('render', () => {
        it('should call view.appendNav and return rendered HTML', async () => {
            const mockHTML = '<nav>Navbar HTML</nav>';
            (View.prototype.appendNav as jest.Mock).mockReturnValue(mockHTML);

            const result = await navbar.render();

            expect(View.prototype.appendNav).toHaveBeenCalled();
            expect(result).toBe(mockHTML);
        });
    });

    describe('afterRender & Theme toggling', () => {
        it('should apply default light theme from localStorage and set title', async () => {
            await navbar.afterRender();

            expect(document.documentElement.classList.contains('light')).toBe(true);
            const titleEl = document.getElementById('_title');
            expect(titleEl?.innerHTML).toContain('<title');
        });

        it('should toggle theme from light to dark when theme button is clicked', async () => {
            await navbar.afterRender();

            const themeBtn = document.getElementById('theme-toggle') as HTMLElement;
            themeBtn.click();

            expect(document.documentElement.classList.contains('dark')).toBe(true);
            expect(localStorage.getItem('theme')).toBe('dark');

            const themeIcon = themeBtn.querySelector('i');
            expect(themeIcon?.className).toBe('bi bi-brightness-high-fill');
        });
    });

    describe('afterRender & Search input handler', () => {
        let pushStateSpy: jest.SpyInstance;
        let dispatchEventSpy: jest.SpyInstance;

        beforeEach(() => {
            pushStateSpy = jest.spyOn(window.history, 'pushState').mockImplementation(() => {});
            dispatchEventSpy = jest.spyOn(window, 'dispatchEvent').mockImplementation(() => true);
        });

        it('should ignore search when query is less than 3 characters', async () => {
            await navbar.afterRender();

            const searchInput = document.getElementById('nav-search') as HTMLInputElement;
            searchInput.value = 'hi';

            const event = new KeyboardEvent('keydown', { key: 'Enter' });
            searchInput.dispatchEvent(event);

            expect(pushStateSpy).not.toHaveBeenCalled();
        });

        it('should ignore search when query contains forbidden special characters', async () => {
            await navbar.afterRender();

            const searchInput = document.getElementById('nav-search') as HTMLInputElement;
            searchInput.value = '<script>alert(1)</script>';

            const event = new KeyboardEvent('keydown', { key: 'Enter' });
            searchInput.dispatchEvent(event);

            expect(pushStateSpy).not.toHaveBeenCalled();
        });

        it('should trigger navigation to search URL when valid query is submitted via Enter or Space', async () => {
            await navbar.afterRender();

            const searchInput = document.getElementById('nav-search') as HTMLInputElement;
            searchInput.value = 'react testing';

            const event = new KeyboardEvent('keydown', { key: 'Enter' });
            searchInput.dispatchEvent(event);

            expect(pushStateSpy).toHaveBeenCalledWith(
                {},
                'search',
                expect.stringContaining('/search/react%20testing')
            );
            expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(PopStateEvent));
            expect(searchInput.value).toBe('');
        });
    });
});