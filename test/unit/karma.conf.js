const path          = require('path'),
      merge         = require('webpack-merge'),
      baseConfig    = require('../../build/webpack.base.conf'),
      utils         = require('../../build/utils'),
      webpack       = require('webpack'),
      projectRoot   = path.resolve(__dirname, '../../'),
      webpackConfig = merge(baseConfig, {
        devtool: '#inline-source-map',

        plugins: [
          new webpack.DefinePlugin({
            'process.env': require('../../config/test.env')
          })
        ]
      });

// no need for app entry during tests
delete webpackConfig.entry;

// add style loaders for components
webpackConfig.module.rules = utils.styleLoaders().concat(webpackConfig.module.rules);

// make sure istanbul-instrumenter loader is applied before eslint
webpackConfig.module.rules.unshift({
  enforce: 'pre',
  test   : /\.js$/,
  include: path.resolve(projectRoot, 'src'),
  use    : {
    loader : 'istanbul-instrumenter-loader',
    options: {
      esModules: true
    }
  }
});


utils.modifyLoader(webpackConfig, 'vue', function (loader) {
  Object.assign(loader.use.options.loaders, utils.joinLoaders({
    js: ['istanbul-instrumenter-loader', 'babel-loader']
  }));
});

utils.modifyLoader(webpackConfig, 'babel', function (loader) {
  const testRoot = path.resolve(projectRoot, 'test/unit');
  loader.include = Array.isArray(loader.include) ? loader.include.concat(testRoot) : [loader.include, testRoot];
});

module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers         : ['Chrome'],
    frameworks       : ['mocha', 'sinon-chai'],
    reporters        : ['spec', 'coverage'],
    files            : ['./index.js'],
    preprocessors    : {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack          : webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter : {
      dir      : './coverage',
      reporters: [{
        type  : 'lcov',
        subdir: '.'
      }, {
        type: 'text-summary'
      }]
    }
  });
};
