const path                    = require('path'),
      config                  = require('../config'),
      utils                   = require('./utils'),
      ESLintFriendlyFormatter = require('eslint-friendly-formatter'),
      autoprefixer            = require('autoprefixer'),
      projectRoot             = path.resolve(__dirname, '../'),
      env                     = process.env.NODE_ENV,
      // check env & config/index.js to decide weither to enable CSS Sourcemaps for the
      // various preprocessor loaders added to vue-loader at the end of this file
      cssSourceMapDev         = (env === 'development' && config.dev.cssSourceMap),
      cssSourceMapProd        = (env === 'production' && config.build.productionSourceMap),
      useCssSourceMap         = cssSourceMapDev || cssSourceMapProd;

module.exports = {
  entry        : {
    app: './src/main.js'
  },
  output       : {
    path      : config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename  : '[name].js'
  },
  resolve      : {
    extensions: ['.js', '.json', '.vue'],
    modules   : [path.join(__dirname, '../node_modules')],
    alias     : {
      'src'       : path.resolve(__dirname, '../src'),
      'assets'    : path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    modules: [path.join(__dirname, '../node_modules')]
  },

  module: {
    rules: [{
      enforce: 'pre',
      test   : /\.vue$/,
      include: projectRoot,
      exclude: /node_modules/,
      use    : {
        loader : 'eslint-loader',
        options: {
          formatter: ESLintFriendlyFormatter
        }
      }
    }, {
      enforce: 'pre',
      test   : /\.js/,
      include: projectRoot,
      exclude: /node_modules/,
      use    : {
        loader : 'eslint-loader',
        options: {
          formatter: ESLintFriendlyFormatter
        }
      }
    }, {
      test: /\.vue$/,
      use : {
        loader : 'vue-loader',
        options: {
          loaders : utils.joinLoaders(utils.cssLoaders({sourceMap: useCssSourceMap})),
          esModule: true,
          postcss : [
            autoprefixer({
              browsers: ['last 2 versions']
            })
          ]
        }
      }
    }, {
      test   : /\.js$/,
      include: projectRoot,
      exclude: /node_modules/,
      use    : {
        loader: 'babel-loader'
      }
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use : {
        loader : 'url-loader',
        options: {
          limit: 10000,
          name : utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use : {
        loader : 'url-loader',
        options: {
          limit: 10000,
          name : utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    }]
  }
};
