const path = require('path');
const chalk = require('chalk');

// 插件
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 使用TerserPlugin来替代uglifyjs-webpack-plugin解决uglifyjs不支持es6语法问题
const TerserPlugin = require('terser-webpack-plugin');
// 用于强制所有模块的完整路径必需与磁盘上实际路径的确切大小写相匹配
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
// 进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 识别某些类型的 webpack 错误并整理，以提供开发人员更好的体验。
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// 将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 打包前清理文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 用于在 webpack 构建期间优化、最小化 CSS文件
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const getRules = require('./loader');
const merge = require('webpack-merge');

// 获取webpack配置
const getConfig = (option, isProd, outputDir = 'dist') => {
  const { moduleName } = option;

  let baseConfig = {
    mode: isProd ? 'production' : 'development',
    context: process.cwd(),
    devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
    entry: {
      [moduleName]: option.moduleEntry,
    },
    output: {
      path: path.join(process.cwd(), outputDir),
      filename: isProd ? '[name]/js/bundle.[contenthash:8].js' : '[name]/js/bundle.js',
      publicPath: option.cdn ? option.cdn : '/', // CDN服务器地址
      chunkFilename: `${moduleName}${isProd ? '/js/[name].[contenthash:8].js' : '/js/[name].js'}`,
      globalObject: "(typeof self !== 'undefined' ? self : this)",
    },
    resolve: {
      alias: {
        '@': path.join(process.cwd(), 'app'),
      },
      extensions: ['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'],
      modules: ['node_modules', path.join(process.cwd(), 'node_modules')],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            test: /[\\\/]node_modules[\\\/]/,
            priority: -10,
            chunks: 'initial',
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true,
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          extractComments: false,
          sourceMap: false,
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
        }),
      ],
    },
    node: {
      setImmediate: false,
      process: 'mock',
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    module: {
      noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
      rules: getRules(true, isProd, moduleName),
    },
    plugins: [
      // webpack 内置插件，用于创建在编译时可以配置的全局常量
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
        'process.env.BASE_URL': JSON.stringify('/'),
      }),
      new VueLoaderPlugin(),
      new CaseSensitivePathsPlugin(),
      new ProgressBarPlugin({
        format: `${chalk.green.bold('编译中...')} [:bar] ${chalk.green.bold(
          ':percent'
        )} (:elapsed seconds) ${moduleName} :msg `,
        clear: false,
        summary: false, // 防止和friendly输出冲突
      }),
      new HtmlWebpackPlugin({
        template: path.join(process.cwd(), `app/${moduleName}/index.html`), // 模板路径
        filename: `${moduleName}/index.html`, // 输出的html的文件名称
        chunks: [moduleName, 'chunk-vendors', 'chunk-common'],
        // true：默认值，script标签位于html文件的 body 底部
        // body：script标签位于html文件的 body 底部（同 true）
        // head：script 标签位于 head 标签内
        // false：不插入生成的 js 文件，只是单纯的生成一个 html 文件
        inject: true, //  true, body, head, false.
        minify: isProd
          ? {
              minifyCSS: true, // 压缩内联css
              minifyJS: true, // 压缩内联js
              removeComments: true, // 移除注释
              collapseWhitespace: true, // 合并空格
              removeAttributeQuotes: true, // 移除属性的引号
            }
          : false,
      }),
      new BundleAnalyzerPlugin({
        logLevel: 'warn',
        openAnalyzer: false,
        analyzerMode: 'static',
        // analyzerMode: args.report ? 'static' : 'disabled',
        reportFilename: `${moduleName}report.html`,
        statsFilename: `${moduleName}report.json`,
        // generateStatsFile: !!args['report-json'],
        generateStatsFile: true,
      }),
    ],
  };

  if (isProd) {
    let prodPlugin = [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: path.join(process.cwd(), `${outputDir}/${moduleName}`),
      }),
      new MiniCssExtractPlugin({
        filename: `${moduleName}/css/bundle.[contenthash:8].css`,
      }),
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
    ];
    baseConfig.plugins = baseConfig.plugins.concat(prodPlugin);
  } else {
    let devPlugin = [
      new webpack.HotModuleReplacementPlugin({
        options: {},
        multiStep: undefined,
        fullBuildTimeout: 200,
        requestTimeout: 10000,
      }),
      new webpack.NamedModulesPlugin(),
      new FriendlyErrorsWebpackPlugin(),
    ];
    baseConfig.plugins = baseConfig.plugins.concat(devPlugin);
  }

  // 合并用户配置
  // return merge(baseConfig, isProd ? options.prod : options.dev);
  return baseConfig;
};

// 获取开发服务器配置
const getDevServer = async function() {
  const portfinder = require('portfinder'); // 端口号
  const address = require('address');

  portfinder.basePort = 1111; // 默认端口号
  const host = address.ip(); // 默认域名
  const port = await portfinder.getPortPromise();

  let baseConfig = {
    logLevel: 'silent',
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',
    // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过传入以下启用
    historyApiFallback: {
      disableDotRule: true,
    },

    // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。默认为使用当前工作目录作为提供内容的目录
    contentBase: '/public',

    // 告诉服务器观看devServer.contentBase选项提供的文件。文件更改将触发整个页面重新加载。
    watchContentBase: true,
    hot: true, // 热模块替换
    injectClient: false,
    inline: true,
    // quiet: true,

    // Enable gzip compression of generated files.
    compress: true, // 压缩
    // It is important to tell WebpackDevServer to use the same "root" path
    // as we specified in the config. In development, we always serve from /.
    publicPath: '/public/',
    overlay: { warnings: false, errors: true },
    https: false,
    open: false,
    host: host,
    port: port,
  };

  // 合并用户配置
  return baseConfig;
};

/**
 *
 * @param {Array} modules [{moduleName: 'xx', moduleEntry: 'yy'}]
 * @param {boolean} isProd isProduction
 * @returns {Array} webpackConfig[]
 */
const getConfigArray = (modules, isProd, outputDir) => {
  let configArray = modules.map((moduleItem) => getConfig(moduleItem, isProd, outputDir));
  // 只在第一个配置中加入插件，是为了防止多个进程多个输出
  configArray[0].plugins = configArray[0].plugins.concat([
    // new FriendlyErrorsWebpackPlugin()
  ]);
  return configArray;
};

module.exports = { getDevServer, getConfigArray };
