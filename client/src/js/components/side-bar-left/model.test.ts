import Model from './model';

describe('SideBarLeft Model', () => {
    it('should instantiate Model successfully', () => {
        const model = new Model();
        expect(model).toBeInstanceOf(Model);
    });
});