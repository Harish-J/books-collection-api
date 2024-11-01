module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: 'api/.*\\.spec\\.ts$', // Adjust to match test files in the `api` folder
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'api/**/*.ts', // Collect coverage from TypeScript files in the `api` folder
    '!api/**/*.module.ts', // Exclude module files from coverage
    '!api/**/schemas/**/*.ts', // Exclude schema files from coverage
  ],
  coveragePathIgnorePatterns: [
    'api/.*\\.module\\.ts$', // Skip module files for coverage
    'api/.*/schemas/.*\\.ts$', // Skip schema files for coverage
    'api/.*/validation/.*\\.ts$', // Skip schema files for coverage
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
