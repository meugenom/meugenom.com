// jest.config.js
module.exports = {
  clearMocks: true,
  verbose: true,
  moduleFileExtensions: ['ts', 'js', 'mjs'],
  moduleNameMapper: {
    '\\.html$': '<rootDir>/jest/HtmlStub.js',
    '\\.(css|scss|less)$': '<rootDir>/jest/styleMock.js', // Mock CSS imports
  },
  rootDir: '.',
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  // Ensure node_modules are generally ignored, but we rely on moduleNameMapper above
  //transformIgnorePatterns: [
  //  "/node_modules/(?!markdown-tailwind-css-compiler)" 
  //],
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|mjs)$",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/build/",
  ],
  roots: [
    "<rootDir>/src",
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,js}",
    "!src/**/*.d.ts",
    "!src/**/index.ts"
  ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["html", "text", "lcov"],
};