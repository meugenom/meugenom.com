import Model from './model';

describe('Navbar Model', () => {
    it('should instantiate Model successfully', () => {
        const model = new Model();
        expect(model).toBeInstanceOf(Model);
    });
});