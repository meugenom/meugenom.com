import Model from './model';

describe('Loader Model', () => {
    it('should instantiate Model successfully', () => {
        const model = new Model();
        expect(model).toBeInstanceOf(Model);
    });
});