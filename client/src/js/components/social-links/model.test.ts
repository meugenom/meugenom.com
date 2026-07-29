import Model from './model';

describe('SocialLinks Model', () => {
    it('should instantiate Model successfully', () => {
        const model = new Model();
        expect(model).toBeInstanceOf(Model);
    });
});