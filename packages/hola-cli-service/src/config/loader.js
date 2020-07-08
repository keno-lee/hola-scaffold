const path = require('path');
const vueLoader = () => {
  return {
    test: /\.vue$/,
    use: [{ loader: 'cache-loader' }, { loader: 'vue-loader' }],
  };
};

const imageLoader = (moduleName) => {
  return {
    test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: `${moduleName}/img/[name].[hash:8].[ext]`,
        },
      },
    ],
  };
};

const svgLoader = (moduleName) => {
  return {
    test: /\.(svg)(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: `${moduleName}/svg/[name].[hash:8].[ext]`,
        },
      },
    ],
  };
};

const mediaLoader = (moduleName) => {
  return {
    test: /\.(mp4|webm|ogg|mp3|wac|flac|aac)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 4096,
          context: path.resolve(process.cwd(), './app'),
          name: `${moduleName}/media/[name].[hash:8].[ext]`,
        },
      },
    ],
  };
};

const fontLoader = (moduleName) => {
  return {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 4096,
          context: path.resolve(process.cwd(), './app'),
          name: `${moduleName}/fonts/[name].[hash:8].[ext]`,
        },
      },
    ],
  };
};

const pugLoader = () => {
  return {
    test: /\.pug$/,
    use: [{ loader: 'raw-loader' }, { loader: 'pug-plain-loader' }],
  };
};

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const miniCssItem = {
  loader: MiniCssExtractPlugin.loader,
  options: { sourceMap: false, publicPath: '../', hmr: false },
};
// 层叠样式表加载
const styleItem = { loader: 'style-loader', options: { sourceMap: false } };
// vue层叠样式表加载
const vueStyleItem = { loader: 'vue-style-loader', options: { sourceMap: false } };
// 将 CSS 转化成 CommonJS 模块
const cssItem = { loader: 'css-loader', options: { sourceMap: false } };
// 将 postcss 编译成 CSS
const postcssItem = {
  loader: 'postcss-loader',
  options: { sourceMap: false, plugins: [require('autoprefixer')] },
};
// sassloader
const sassItem = { loader: 'sass-loader', options: { sourceMap: false } };
// lessLoader
const lessItem = { loader: 'less-loader', options: { sourceMap: false } };
// stylusLoader
const stylusItem = { loader: 'stylus-loader', options: { sourceMap: false } };

const cssLoader = (isProd = false, isVue = false) => {
  let rule = {
    test: /\.css$/i,
    use: [
      isProd ? miniCssItem : isVue ? vueStyleItem : styleItem, // 生产环境用分割css，开发用层叠样式表
      cssItem,
      postcssItem,
    ],
  };
  return rule;
};

const postcssLoader = (isProd = false, isVue = false) => {
  return {
    test: /\.p(ost)?css$/,
    use: [
      isProd ? miniCssItem : isVue ? vueStyleItem : styleItem, // 生产环境用分割css，开发用层叠样式表
      cssItem,
      postcssItem,
    ],
  };
};

const sassLoader = (isProd = false, isVue = false) => {
  return {
    test: /\.(sass)|(scss)$/,
    use: [
      isProd ? miniCssItem : isVue ? vueStyleItem : styleItem, // 生产环境用分割css，开发用层叠样式表
      cssItem,
      postcssItem,
      sassItem,
    ],
  };
};

const lessLoader = (isProd = false, isVue = false) => {
  return {
    test: /\.less$/,
    use: [
      isProd ? miniCssItem : isVue ? vueStyleItem : styleItem, // 生产环境用分割css，开发用层叠样式表
      cssItem,
      postcssItem,
      lessItem,
    ],
  };
};

const stylusLoader = (isProd = false, isVue = false) => {
  return {
    test: /\.styl(us)?$/,
    use: [
      isProd ? miniCssItem : isVue ? vueStyleItem : styleItem, // 生产环境用分割css，开发用层叠样式表
      cssItem,
      postcssItem,
      stylusItem,
    ],
  };
};

const jsLoader = () => {
  return {
    test: /\.m?jsx?$/,
    use: [
      {
        loader: 'babel-loader',
        // options: {
        //   presets: ['@babel/preset-env'],
        //   plugins: ['@babel/plugin-syntax-dynamic-import']
        // }
      },
    ],
  };
};

const eslintLoader = () => {
  return {
    enforce: 'pre',
    test: /\.(vue|(j|t)sx?)$/,
    exclude: [/node_modules/],
    use: [
      {
        loader: 'eslint-loader',
        options: {
          extensions: ['.js', '.jsx', '.vue'],
          cache: true,
        },
      },
    ],
  };
};

/**
 * 获取rules
 * @returns {Array} rule[]
 */
module.exports = getRules = (isVue, isProd, moduleName) => {
  let rules = [
    vueLoader(),
    imageLoader(moduleName),
    svgLoader(moduleName),
    mediaLoader(moduleName),
    fontLoader(moduleName),
    cssLoader(isProd, isVue),
    postcssLoader(isProd, isVue),
    sassLoader(isProd, isVue),
    jsLoader(),
    eslintLoader(),
  ];

  if (!isVue) {
    rules.unshift();
  }

  return rules;
};
