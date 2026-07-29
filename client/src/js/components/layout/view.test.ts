import View from './view';

describe('Layout View', () => {
    let view: View;

    beforeEach(() => {
        view = new View();
    });

    it('should create and return layout HTML HTMLElement hierarchy', async () => {
        const layoutElement = await view.getLayoutHTMLElement();

        expect(layoutElement).toBeInstanceOf(HTMLElement);
        expect(layoutElement.getAttribute('id')).toBe('layout');

        // Verify child structural containers
        const sideBarLeft = layoutElement.querySelector('#side-bar-left');
        const page = layoutElement.querySelector('#page');
        const sideBarRight = layoutElement.querySelector('#side-bar-right');

        expect(sideBarLeft).not.toBeNull();
        expect(page).not.toBeNull();
        expect(sideBarRight).not.toBeNull();

        // Verify default CSS classes
        expect(sideBarLeft?.classList.contains('hidden')).toBe(true);
        expect(sideBarRight?.classList.contains('hidden')).toBe(true);
    });
});