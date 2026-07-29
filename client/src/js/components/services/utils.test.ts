import Utils from './utils';

describe('Utils Service', () => {
    afterEach(() => {
        // Reset location pathname back to root using history API
        window.history.pushState({}, '', '/');
    });

    describe('parseRequestURL', () => {
        it('should correctly parse resource, id, and verb from location pathname', () => {
            window.history.pushState({}, '', '/article/my-slug/edit');

            const utils = new Utils();
            const request = utils.parseRequestURL();

            expect(request).toEqual({
                resource: 'article',
                id: 'my-slug',
                verb: 'edit',
            });
        });

        it('should return null values for root pathname', () => {
            window.history.pushState({}, '', '/');

            const utils = new Utils();
            const request = utils.parseRequestURL();

            expect(request).toEqual({
                resource: null,
                id: null,
                verb: null,
            });
        });
    });

    describe('lazyLoadImage', () => {
        it('should insert loader element and load image when intersecting', async () => {
            // Setup DOM with image containing dataset src
            const parent = document.createElement('div');
            const img = document.createElement('img');
            img.dataset.src = 'https://example.com/photo.jpg';
            parent.appendChild(img);
            document.body.appendChild(parent);

            // Mock fetch and URL.createObjectURL for blob image loading
            const mockBlob = new Blob(['fake-image-data'], { type: 'image/jpeg' });
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                blob: jest.fn().mockResolvedValue(mockBlob),
            });

            window.URL.createObjectURL = jest.fn().mockReturnValue('blob:http://localhost/fake-uuid');

            // Capture observer callback passed into Mock IntersectionObserver
            let observerCallback: any;
            window.IntersectionObserver = jest.fn().mockImplementation((cb) => {
                observerCallback = cb;
                return {
                    observe: jest.fn(),
                    unobserve: jest.fn(),
                    disconnect: jest.fn(),
                };
            }) as any;

            await Utils.lazyLoadImage(img);

            // Verify loader spinner element was inserted
            const loader = parent.querySelector('.imageLoader');
            expect(loader).not.toBeNull();

            // Simulate IntersectionObserver callback invocation
            observerCallback([
                {
                    isIntersecting: true,
                    target: img,
                },
            ], { unobserve: jest.fn() });

            // Allow async operations inside forEach callback to resolve
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(global.fetch).toHaveBeenCalledWith('https://example.com/photo.jpg');
            expect(img.src).toBe('blob:http://localhost/fake-uuid');
        });
    });
});