import Model from './model';

describe('Home Model', () => {
    let model: Model;

    beforeEach(() => {
        model = new Model();
    });

    it('should initialize with an empty articles object', () => {
        expect(model.articles).toEqual({});
    });

    it('should execute setArticles method successfully', async () => {
        await expect(model.setArticles()).resolves.toBeUndefined();
    });
});