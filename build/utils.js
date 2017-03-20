const path              = require('path'),
      config            = require('../config'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = function (options) {
  options = options || {};

  // generate loader string to be used with extract text plugin
  function generateLoaders(loaders) {
    const sourceLoader = loaders.map(function (loader) {
      let extraParamChar;

      if (/\?/.test(loader)) {
        loader         = loader.replace(/\?/, '-loader?');
        extraParamChar = '&'
      } else {
        loader         = loader + '-loader';
        extraParamChar = '?'
      }

      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '');
    });

    // Extract CSS when that option is specified
    // (which is the case during production build)
    return (options.extract) ? ExtractTextPlugin.extract({
        use     : sourceLoader,
        fallback: 'vue-style-loader'
      }) : ['vue-style-loader'].concat(sourceLoader);
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css    : generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less   : generateLoaders(['css', 'less']),
    sass   : generateLoaders(['css', 'sass?indentedSyntax']),
    scss   : generateLoaders(['css', 'sass']),
    stylus : generateLoaders(['css', 'stylus']),
    styl   : generateLoaders(['css', 'stylus'])
  }
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output  = [],
        loaders = exports.cssLoaders(options);
  let extension;

  for (extension in loaders) {
    output.push({
      test: new RegExp(`\\.${extension}$`),
      use : loaders[extension]
    })
  }

  return output;
};

// join loaders with a string separator
exports.joinLoaders = function (loaders, separator = '!') {
  return Object.keys(loaders).reduce(function (acc, key) {
    acc[key] = loaders[key].join(separator);
    return acc;
  }, {});
};

// Modify an existing loader in-place
exports.modifyLoader = function (webpackConfig, loaderName, fn) {
  const loader = webpackConfig.module.rules.find(function (rule) {
    return rule.hasOwnProperty('use') && rule.use.hasOwnProperty('loader') && rule.use.loader === `${loaderName}-loader`;
  });

  if (loader) {
    fn.apply(undefined, [loader]);
  }
};
