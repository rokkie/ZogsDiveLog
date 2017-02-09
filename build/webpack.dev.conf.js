const config            = require('../config'),
      webpack           = require('webpack'),
      merge             = require('webpack-merge'),
      utils             = require('./utils'),
      baseWebpackConfig = require('./webpack.base.conf'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
});

module.exports = merge(baseWebpackConfig, {
  // eval-source-map is faster for development
  devtool: '#inline-source-map',

  module: {
    rules: [].concat(utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap
    }))
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject  : true
    })
  ]
});
