// Global test environment setup for JSDOM

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
};

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);

// Mock fetch API globally
global.fetch = jest.fn();

// Reset DOM and mocks after each test
afterEach(() => {
  document.body.innerHTML = '';
  localStorage.clear();
  jest.clearAllMocks();
});