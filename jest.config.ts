export default {
  preset: "ts-jest", // Use ts-jest to transpile TypeScript
  testEnvironment: "jest-environment-jsdom", // Use jsdom for testing DOM-related behavior (for React)

  // Transform TypeScript and JavaScript (JSX/TSX) files
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transpile TypeScript files (.ts/.tsx)
    "^.+\\.jsx?$": "babel-jest", // Transpile JSX files using babel-jest
  },

  // Module name mapping for static file imports and CSS handling
  moduleNameMapper: {
    "\\.(css|scss|less)$": "identity-obj-proxy", // Mock CSS imports as identity objects (for testing)
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg)$":
      "<rootDir>/test/__mocks__/fileMock.js", // Mock image/static files
  },

  // Jest setup file for extending matchers (e.g., jest-dom) and other custom setups
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.ts", // Include a setup file for jest-environment-jsdom and additional setup
  ],

  // Collect coverage information from the files that should be tested
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}", // Collect coverage from all TypeScript and TSX files in the src folder
    "!src/**/*.d.ts", // Exclude TypeScript definition files from coverage
  ],

  // Optional: Configure test environment options (if needed)
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.node.json", // Or use tsconfig.jest.json if you have a custom file

      isolatedModules: true, // Ensures that each file is treated independently (faster compilation)
    },
  },

  // Set up jest to work with TypeScript and React by resolving import paths
  moduleDirectories: ["node_modules", "src"], // Resolves imports from the `src` folder
};
