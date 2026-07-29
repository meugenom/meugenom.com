import View from './view';

describe('Loader View', () => {
    let view: View;

    beforeEach(() => {
        view = new View();
    });

    it('should return empty string or template from appendLoader', () => {
        const html = view.appendLoader();
        expect(typeof html).toBe('string');
    });
});