const path = require('path');

module.exports = {
  resetCache: true,
  resolver: {
    sourceExts: [
      'js',
      'ts',
      'tsx',
    ],
    extraNodeModules: new Proxy({}, {
      get: (target, name) => path.join(process.cwd(), `node_modules/${name}`),
    }),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
