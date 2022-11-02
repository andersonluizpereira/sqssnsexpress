module.exports = async () => {
  return {
    verbose: true,
    collectCoverage: true,
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    collectCoverageFrom: ['src/**/*.js'],
    rootDir: './',
  };
};
