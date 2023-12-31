module.exports = {
    verbose: true,
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    moduleDirectories: ["node_modules", "src"],
    moduleNameMapper: {
      "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./jest.setup.js'],
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      "^.+\\.(js|jsx)$": "babel-jest",
      "^.+\\.jsx?$": "babel-jest",
    }
  };