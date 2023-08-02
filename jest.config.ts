import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	preset: 'ts-jest', // Use ts-jest as the test runner
	testEnvironment: 'jsdom', // Use jsdom as the test environment for testing React components
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // Specify the file extensions Jest should consider for tests
	roots: ['<rootDir>/src'], // Define the root directory for your tests
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$', // Regex pattern for test file naming conventions
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files with ts-jest
		'^.+\\.scss$': 'jest-transform-stub',
		'^.+\\.(png|jpg|jpeg|gif|svg)$': 'jest-transform-stub',
	},
	moduleNameMapper: {
		// Add any necessary module name mappings, e.g., for CSS imports, etc.
		'\\.(css|scss)$': 'identity-obj-proxy',
	},
	collectCoverageFrom: [
		'src/**/*.{ts,tsx}', // Define the files to include in code coverage report
		'!src/**/*.d.ts', // Exclude TypeScript declaration files (*.d.ts) from coverage
	],
	coveragePathIgnorePatterns: [
		'/node_modules/', // Ignore coverage for files in node_modules directory
	],
	// Add any other Jest configurations as needed
};

export default config;
