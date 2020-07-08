const colors = require('chalk');

const defaults = {
  host: '0.0.0.0',
  port: 8080,
  https: false
};

module.exports = (args) => {
  console.log(colors.green.bold('正在启动开发服务器...'));
  // const isProduction = process.env.NODE_ENV === 'production';

  // create server
  /**
   * nodejs api WebpackDevServer
   * @see {link} https://github.com/webpack/webpack-dev-server/blob/master/examples/api/simple/server.js
   */

  const Webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const WebpackDevServer = require('webpack-dev-server');

  // webpackConfig 命令行 > hola.config.js > default


  const compiler = Webpack(webpackConfig);
  const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    open: true,
    stats: {
      colors: true
    }
  });
  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(8080, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:8080');
  });
};
