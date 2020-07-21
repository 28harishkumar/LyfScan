const path = require('path');

// FIXME: Resolve `transform[stderr]: Could not resolve` command-line warnings.
// FIXME: Reproducible when starting with clearing cache (npm start -- -c)
//
// TODO: Framework path aliasing even not needed here. Replace?
// TODO: Replace nested package.json-s with aliases

module.exports = function (api) {
  api.cache(false);

  const presets = ["module:metro-react-native-babel-preset"];

  return { presets };
};
