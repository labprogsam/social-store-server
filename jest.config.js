export default {
  testEnvironment: 'node',
  clearMocks: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!node-fetch|data-uri-to-buffer|fetch-blob|formdata-polyfill)',
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
};