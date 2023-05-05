const jestConfig = {
    roots: ['<rootDir>/src'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
    coveragePathIgnorePatterns: ['src/index.tsx', 'src/utils/test-helpers'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testMatch: ['<rootDir>/src/**/*.{spec,test}.{js, jsx,ts,tsx}'],
    testEnvironment: 'jsdom',
    preset: 'ts-jest/presets/default-esm',
    modulePaths: [],
    moduleNameMapper: {
        '^.+\\.(css|scss)$': 'identity-obj-proxy',
    },
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
    resetMocks: true,
};

module.exports = jestConfig;
