/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,

  testEnvironment: 'node',

  preset: 'ts-jest',

  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],

  roots: [
    "<rootDir>"
  ],

  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],

  testPathIgnorePatterns: [
    "/node_modules/"
  ],

  transformIgnorePatterns: [
    "/node_modules/",
    "\\.pnp\\.[^\\/]+$"
  ],

  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },

  collectCoverage: true,

  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text']
};

export default config;
