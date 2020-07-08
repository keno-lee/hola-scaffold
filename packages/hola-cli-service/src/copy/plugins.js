const chalk = require('chalk');
const path = require('path');

const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理垃圾文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// const getAssetPath = require('./getAssetPath');
// npm i html-webpack-plugin friendly-errors-webpack-plugin clean-webpack-plugin mini-css-extract-plugin @intervolga/optimize-cssnano-plugin -S
let rootOptions = {
  filenameHashing: true,
};

// vue加载
exports.vueLoaderPlugin = () => {
  return new VueLoaderPlugin();
};

// html模板
exports.htmlWebpackPlugin = (targetName) => {
  return new htmlWebpackPlugin({
    template: path.join(process.cwd(), `${targetName}/index.html`),
    filename: `${targetName}/index.html`,
    hash: false,
    inject: true,
    compile: true,
    favicon: false,
    minify: false,
    cache: true,
    showErrors: true,
    chunks: 'all',
    excludeChunks: [],
    chunksSortMode: 'auto',
    meta: {},
    xhtml: false,
  });
};

// 打包清理
exports.cleanWebpackPlugin = () => {
  return new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: path.join(__dirname, '../distweb'),
  }); // 每次打包之前清理打包目录
};

// 分割css，替换(extract-text-webpack-plugin)
exports.miniCssExtractPlugin = (isProdEnv) => {
  return new MiniCssExtractPlugin({
    // filename: getAssetPath(
    //   rootOptions,
    //   `css/[name]${rootOptions.filenameHashing ? '.[contenthash:8]' : ''}.css`
    // ),
    // chunkFilename: getAssetPath(
    //   rootOptions,
    //   `css/[name]${rootOptions.filenameHashing ? '.[contenthash:8]' : ''}.css`
    // ),
    filename: 'css/[name].[contenthash:8].css',
    // chunkFilename: isProdEnv ? '[id].[hash].css' : '[id].css',
  });
};

// css压缩
exports.optimizeCssnanoPlugin = (isProdEnv) => {
  return new OptimizeCssnanoPlugin({
    sourceMap: !isProdEnv,
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
  });
};

//
exports.namedModulesPlugin = () => {
  return new webpack.NamedModulesPlugin(); // 热更新 HMR
};

exports.hotModuleReplacementPlugin = () => {
  return new webpack.HotModuleReplacementPlugin({
    options: {},
    multiStep: undefined,
    fullBuildTimeout: 200,
    requestTimeout: 10000,
  });
};

exports.noEmitOnErrorsPlugin = () => {
  return new webpack.NoEmitOnErrorsPlugin();
};

exports.friendlyErrorsPlugin = (options) => {
  return new FriendlyErrorsPlugin(options);
};
/**
 * @param {string} env 'development' | 'production'
 */
exports.definePlugin = (env) => {
  return new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env),
    'process.env.BASE_URL': JSON.stringify('/'),
  });
};

exports.copyWebpackPlugin = () => {
  return new CopyWebpackPlugin([
    {
      from: '/Users/keno/Desktop/single-page/public',
      to: '/Users/keno/Desktop/single-page/dist',
      toType: 'dir',
      ignore: ['.DS_Store', { glob: 'index.html', matchBase: false }],
    },
  ]);
};

exports.caseSensitivePathsPlugin = () => {
  return new CaseSensitivePathsPlugin({
    options: {},
    logger: {},
    pathCache: {},
    fsOperations: 0,
    primed: false,
  });
};

exports.terserPlugin = () => {
  return new TerserPlugin({
    test: /\.js(\?.*)?$/i,
    extractComments: false,
    sourceMap: true,
    cache: true,
    parallel: true,
    terserOptions: {
      compress: {
        arrows: false,
        collapse_vars: false,
        comparisons: false,
        computed_props: false,
        hoist_funs: false,
        hoist_props: false,
        hoist_vars: false,
        inline: false,
        loops: false,
        negate_iife: false,
        properties: false,
        reduce_funcs: false,
        reduce_vars: false,
        switches: false,
        toplevel: false,
        typeofs: false,
        booleans: true,
        if_return: true,
        sequences: true,
        unused: true,
        conditionals: true,
        dead_code: true,
        evaluate: true,
      },
      mangle: { safari10: true },
    },
  });
};

exports.webpackProgress = () => {
  return new webpack.ProgressPlugin({
    activeModules: false,
    entries: true,
    handler(percentage, message, ...args) {
      // custom logic
    },
    modules: true,
    modulesCount: 5000,
    profile: false,
    dependencies: true,
    dependenciesCount: 10000,
    percentBy: null,
  });
};

exports.progressBarPlugin = () => {
  return new ProgressBarPlugin({
    format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
    clear: false,
  });
};

//   CopyPlugin {
//     patterns: [Array],
//     options: {}
// },
// DefinePlugin
// definitions: {
//         'process.env': {
//             NODE_ENV: '"development"',
//             BASE_URL: '"/"'
//         }
//     }

// 热加载插件 HMR
// new webpack.LoaderOptionsPlugin({
//   // stylus加前缀
//   options: {
//     stylus: {
//       use: [PostStylus(['autoprefixer'])],
//     },
//     babel: {
//       presets: ['es2015'],
//       plugins: ['transform-runtime'],
//     },
//   },
// }),
