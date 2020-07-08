const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');

const getProd = (targetEntry) => {
  let config = {
    plugins: [
      // 打包前清理文件夹
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: path.join(process.cwd(), 'dist'),
      }),
      // 将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件
      new MiniCssExtractPlugin({
        filename: '[name]/css/bundle.[contenthash:8].css',
      }),
      // 用于在 webpack 构建期间优化、最小化 CSS文件
      new OptimizeCssnanoPlugin({
        sourceMap: false,
        cssnanoOptions: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        },
      }),
    ],
  };

  // 遍历入口，生成多模板
  for (let moduleName in targetEntry) {
    let option = {
      template: path.join(process.cwd(), `app/${moduleName}/index.html`),
      filename: `${moduleName}/index.html`,
      chunks: [moduleName, 'chunk-vendors', 'chunk-common'],
      inject: true,

      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    };
    // console.log('html', option);
    config.plugins.push(new HtmlWebpackPlugin(option));
  }

  return config;
};

module.exports = getProd;
