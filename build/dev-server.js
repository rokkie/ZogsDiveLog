require('./check-versions')();
const config = require('../config');
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
const path            = require('path'),
      express         = require('express'),
      webpack         = require('webpack'),
      opn             = require('opn'),
      proxyMiddleware = require('http-proxy-middleware'),
      staticPath      = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory),
      webpackConfig   = process.env.NODE_ENV === 'testing' ? require('./webpack.prod.conf') : require('./webpack.dev.conf'),
      port            = process.env.PORT || config.dev.port, // default port where dev server listens for incoming traffic
      proxyTable      = config.dev.proxyTable, // Define HTTP proxies to your custom API backend; https://github.com/chimurai/http-proxy-middleware
      app             = express(),
      compiler        = webpack(webpackConfig),
      hotMiddleware   = require('webpack-hot-middleware')(compiler),
      devMiddleware   = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats     : {
          colors: true,
          chunks: false
        }
      });

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({action: 'reload'});
    cb();
  })
});

// proxy api requests
Object.keys(proxyTable).forEach(context => {
  let options = proxyTable[context];

  if (typeof options === 'string') {
    options = {target: options}
  }

  app.use(proxyMiddleware(context, options))
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
app.use(staticPath, express.static('./static'));

module.exports = app.listen(port, err => {
  if (err) {
    console.log(err);
    return
  }

  const uri = `http://localhost:${port}`;
  console.log('Listening at ' + uri + '\n');

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri);
  }
});
