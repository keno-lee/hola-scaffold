const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const getDev = (targetEntry) => {
  let config = {
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        options: {},
        multiStep: undefined,
        fullBuildTimeout: 200,
        requestTimeout: 10000,
      }),
      
      new webpack.NamedModulesPlugin(),
      // 识别某些类型的 webpack 错误并整理，以提供开发人员更好的体验。
      new FriendlyErrorsWebpackPlugin(),
    ],
  };

  // 遍历入口，生成多模板
  for (let moduleName in targetEntry) {
    let option = {
      template: path.join(process.cwd(), `app/${moduleName}/index.html`),
      filename: `${moduleName}/index.html`,
      chunks: [moduleName, 'chunk-vendors', 'chunk-common'],
      inject: true,
    };
    // console.log('html', option);
    config.plugins.push(new HtmlWebpackPlugin(option));
  }

  return config;
};

module.exports = getDev;
