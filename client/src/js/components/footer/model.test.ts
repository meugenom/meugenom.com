import Model from './model';

describe('Footer Model', () => {
    it('should instantiate Model successfully', () => {
        const model = new Model();
        expect(model).toBeInstanceOf(Model);
    });
});