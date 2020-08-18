module.exports = {
  cacheDirectory: ".jest-cache",
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts'
  ],
};
