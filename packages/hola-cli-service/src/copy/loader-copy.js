// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//  npm i mini-css-extract-plugin css-loader sass-loader style-loader less-loader babel-loader url-loader vue-loader -S

exports.styleLoaders = () => {
  return {
    css: this.cssLoader(),
    scss: this.sassLoader(),
  };
};

exports.cssLoader = (isProdEnv) => {
  // let rule = {
  //   test: /\.css$/i,
  //   use: [
  //     {
  //       loader: MiniCssExtractPlugin.loader,
  //       options: { sourceMap: !isProdEnv, publicPath: '../', hmr: !isProdEnv },
  //     },
  //     { loader: 'style-loader', options: { sourceMap: !isProdEnv } },
  //     { loader: 'css-loader', options: { sourceMap: !isProdEnv } },
  //     // { loader: 'postcss-loader', options: { config: { path: __dirname } } },
  //   ],
  // };
  // if (!isProdEnv) {
  //   rule.use.unshift();
  // }
  // return rule;
  return {
    test: /\.css$/i,
    use: [
      { loader: 'vue-style-loader', options: { sourceMap: true } },
      { loader: 'css-loader', options: { sourceMap: true } },
      { loader: 'postcss-loader', options: { sourceMap: true } },
    ],
  };
};

exports.sassLoader = (isProdEnv) => {
  // let rule = {
  //   test: /\.scss$/,
  //   use: [
  //     {
  //       loader: MiniCssExtractPlugin.loader,
  //       options: { sourceMap: !isProdEnv, publicPath: '../', hmr: !isProdEnv },
  //     },
  //     { loader: 'css-loader', options: { sourceMap: !isProdEnv } }, // 将 CSS 转化成 CommonJS 模块
  //     { loader: 'sass-loader', options: { sourceMap: !isProdEnv } }, // 将 Sass 编译成 CSS
  //   ],
  // };

  // if (!isProdEnv) {
  //   rule.use.unshift();
  // }

  // return rule;
  return {
    test: /\.scss$/,
    use: [
      { loader: 'vue-style-loader', options: { sourceMap: true } },
      { loader: 'css-loader', options: { sourceMap: true } },
      // { loader: 'postcss-loader', options: { sourceMap: true } },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        },
      },
    ],
  };
};

exports.lessLoader = (isProdEnv) => {
  return {
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader', // creates style nodes from JS strings
      },
      {
        loader: 'css-loader', // translates CSS into CommonJS
      },
      {
        loader: 'less-loader', // compiles Less to CSS
      },
    ],
  };
};

exports.postcssLoader = (isProdEnv) => {
  return {};
};

exports.jsLoader = () => {
  return {
    test: /\.js$/,
    loader: 'babel-loader',
    // @notice es module in node_modules should include
    include: [path.join(process.cwd(), 'app')],
  };
};
// {
//   test: /\.(js|jsx|ts|tsx)$/,
//   exclude: [/core-js/, /regenerator-runtime/],
//   use: [
//     {
//       loader: 'babel-loader',
//       options: {
//         presets: babelConfig.presets,
//         cacheDirectory: babelCacheDir
//       }
//     },
//     'eslint-loader'
//   ]
// }

exports.fontLoader = () => {
  return {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: 'font/[name].[hash:8].[ext]',
        },
      },
    ],
  };
};

exports.mediaLoader = () => {
  return {
    test: /\.(mp4|webm|ogg|mp3|wac|flac|aac)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: 'media/[name].[hash:8].[ext]',
        },
      },
    ],
  };
};

exports.imgLoader = () => {
  return {
    test: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: 'img/[name].[hash:8].[ext]',
        },
      },
    ],
  };
};

// framework about
exports.vueLoader = () => {
  return {
    test: /\.vue$/,
    use: [
      {
        loader: 'vue-loader',
      },
    ],
  };
};

exports.reactLoader = () => {
  return {};
};

// exports.sassLoader = (isProdEnv) => {
//   let rule = {
//     test: /\.scss$/,
//     use: [
//       {
//         loader: MiniCssExtractPlugin.loader,
//         options: { sourceMap: !isProdEnv, publicPath: '../', hmr: !isProdEnv },
//       },
//       { loader: 'css-loader', options: { sourceMap: !isProdEnv } }, // 将 CSS 转化成 CommonJS 模块
//       { loader: 'sass-loader', options: { sourceMap: !isProdEnv } }, // 将 Sass 编译成 CSS
//     ],
//     // oneOf: [
//     //   {
//     //     resourceQuery: /module/,
//     //     use: [
//     //       {
//     //         loader: 'mini-css-extract-plugin',
//     //         options: {
//     //           hmr: false,
//     //           publicPath: '../',
//     //         },
//     //       },
//     //       {
//     //         loader: 'css-loader',
//     //         options: {
//     //           sourceMap: false,
//     //         },
//     //       },
//     //       {
//     //         loader: 'postcss-loader',
//     //         options: {
//     //           sourceMap: false,
//     //         },
//     //       },
//     //       {
//     //         loader: 'sass-loader',
//     //         options: {
//     //           sourceMap: false,
//     //         },
//     //       },
//     //     ],
//     //   },
//     //   {
//     //     resourceQuery: /\?vue/,
//     //     use: [
//     //       {
//     //         loader: 'mini-css-extract-plugin',
//     //         options: {
//     //           hmr: false,
//     //           publicPath: '../',
//     //         },
//     //       },
//     //       {
//     //         loader: 'css-loader',
//     //         options: {
//     //           sourceMap: false,
//     //           importLoaders: 2,
//     //         },
//     //       },
//     //       {
//     //         loader: 'postcss-loader',
//     //         options: {
//     //           sourceMap: false,
//     //           plugins: [Array],
//     //         },
//     //       },
//     //       {
//     //         loader: 'sass-loader',
//     //         options: {
//     //           sourceMap: false,
//     //         },
//     //       },
//     //     ],
//     //   },
//     //   {
//     //     test: /\.module\.\w+$/,
//     //     use: [
//     //       {
//     //         loader:
//     //           '/Users/keno/Desktop/single-page/node_modules/mini-css-extract-plugin/dist/loader.js',
//     //         options: {
//     //           hmr: false,
//     //           publicPath: '../',
//     //         },
//     //       },
//     //       {
//     //         loader: '/Users/keno/Desktop/single-page/node_modules/css-loader/dist/cjs.js',
//     //         options: {
//     //           sourceMap: false,
//     //           importLoaders: 2,
//     //           modules: [Object],
//     //         },
//     //       },
//     //       {
//     //         loader: '/Users/keno/Desktop/single-page/node_modules/postcss-loader/src/index.js',
//     //         options: {
//     //           sourceMap: false,
//     //           plugins: [Array],
//     //         },
//     //       },
//     //       {
//     //         loader: '/Users/keno/Desktop/single-page/node_modules/sass-loader/dist/cjs.js',
//     //         options: {
//     //           sourceMap: false,
//     //         },
//     //       },
//     //     ],
//     //   },
//     //   {
//     //     use: [
//     //       {
//     //         loader:
//     //           '/Users/keno/Desktop/single-page/node_modules/mini-css-extract-plugin/dist/loader.js',
//     //         options: {
//     //           hmr: false,
//     //           publicPath: '../',
//     //         },
//     //       },
//     //       {
//     //         loader: '/Users/keno/Desktop/single-page/node_modules/css-loader/dist/cjs.js',
//     //         options: {
//     //           sourceMap: false,
//     //           importLoaders: 2,
//     //         },
//     //       },
//     //       {
//     //         loader: '/Users/keno/Desktop/single-page/node_modules/postcss-loader/src/index.js',
//     //         options: {
//     //           sourceMap: false,
//     //           plugins: [Array],
//     //         },
//     //       },
//     //       {
//     //         loader: '/Users/keno/Desktop/single-page/node_modules/sass-loader/dist/cjs.js',
//     //         options: {
//     //           sourceMap: false,
//     //         },
//     //       },
//     //     ],
//     //   },
//     // ],
//   };

//   if (!isProdEnv) {
//     rule.use.unshift();
//   }

//   return rule;
// };
