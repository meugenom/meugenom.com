import SideBarLeft from './index';

describe('SideBarLeft Controller', () => {
    let controller: SideBarLeft;

    beforeEach(() => {
        controller = new SideBarLeft();
    });

    describe('render & afterRender', () => {
        it('should execute render and afterRender without throwing errors', async () => {
            await expect(controller.render()).resolves.toBeUndefined();
            expect(() => controller.afterRender()).not.toThrow();
        });
    });
});