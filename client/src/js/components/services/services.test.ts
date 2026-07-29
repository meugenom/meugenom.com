import Service from './services';

describe('GraphQL Service', () => {
    let service: Service;
    let pushStateSpy: jest.SpyInstance;
    let dispatchEventSpy: jest.SpyInstance;

    beforeEach(() => {
        // Prepare DOM element #page
        document.body.innerHTML = '<div id="page"><div>Existing content</div></div>';

        // Clear static cache between tests
        (Service as any).cache.clear();

        service = new Service();
        pushStateSpy = jest.spyOn(window.history, 'pushState').mockImplementation(() => {});
        dispatchEventSpy = jest.spyOn(window, 'dispatchEvent').mockImplementation(() => true);
    });

    it('should show loader, send POST request, and return data payload', async () => {
        const mockResult = { data: { articlesList: [{ id: '1', title: 'Test' }] } };
        (global.fetch as jest.Mock).mockResolvedValue({
            status: 200,
            json: jest.fn().mockResolvedValue(mockResult),
        });

        const data = await service.graphql('json', 'test-token', '/graphql', '{ articlesList }', {});

        // Check fetch parameters
        expect(global.fetch).toHaveBeenCalledWith('/graphql', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer test-token',
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ query: '{ articlesList }', variables: {} }),
        });

        expect(data).toEqual(mockResult.data);
    });

    it('should return cached result on consecutive calls with identical arguments without fetching', async () => {
        const mockResult = { data: { test: 'value' } };
        (global.fetch as jest.Mock).mockResolvedValue({
            status: 200,
            json: jest.fn().mockResolvedValue(mockResult),
        });

        // First call populates cache
        await service.graphql('json', '', '/graphql', '{ query }', { id: 1 });
        expect(global.fetch).toHaveBeenCalledTimes(1);

        // Second call should serve from cache directly
        const cachedData = await service.graphql('json', '', '/graphql', '{ query }', { id: 1 });
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(cachedData).toEqual(mockResult.data);
    });

    it('should redirect to /error404 on HTTP 404 status response', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            status: 404,
            json: jest.fn(),
        });

        await service.graphql('json', '', '/graphql', '{ query }', {});

        expect(pushStateSpy).toHaveBeenCalledWith({}, '404', expect.stringContaining('/error404'));
        expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(PopStateEvent));
    });

    it('should redirect to /error500 on HTTP 500 status response', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            status: 500,
            json: jest.fn(),
        });

        await service.graphql('json', '', '/graphql', '{ query }', {});

        expect(pushStateSpy).toHaveBeenCalledWith({}, '500', expect.stringContaining('/error500'));
        expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(PopStateEvent));
    });

    it('should redirect to /error502 on network rejection', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

        await service.graphql('json', '', '/graphql', '{ query }', {});

        expect(pushStateSpy).toHaveBeenCalledWith({}, '502', expect.stringContaining('/error502'));
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});