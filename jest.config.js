module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/*.test.js'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  bail: true,
  verbose: true,
  esModules: true,
};
