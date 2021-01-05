const path = require('path')

function resolve(dir) {
  return path.join(process.cwd(), dir)
}

const vueLoader = () => {
  return {
    test: /\.vue$/,
    use: [{ loader: 'cache-loader' }, { loader: 'vue-loader' }]
  }
}

const imageLoader = () => {
  return {
    test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          // 防止出现 <img :src="[object Module]"/>
          esModule: false,
          limit: 4096,
          name: `img/[name].[hash:8].[ext]`
        }
      }
    ]
  }
}

const mediaLoader = () => {
  return {
    test: /\.(mp4|webm|ogg|mp3|wac|flac|aac)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 4096,
          context: path.resolve(process.cwd(), './app'),
          name: `media/[name].[hash:8].[ext]`
        }
      }
    ]
  }
}

const fontLoader = () => {
  return {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 4096,
          context: path.resolve(process.cwd(), './app'),
          name: `fonts/[name].[hash:8].[ext]`
        }
      }
    ]
  }
}

const svgLoader = () => {
  return {
    test: /\.(svg)(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: `svg/[name].[hash:8].[ext]`
        }
      }
    ]
  }
}

const pugLoader = () => {
  return {
    test: /\.pug$/,
    use: [{ loader: 'raw-loader' }, { loader: 'pug-plain-loader' }]
  }
}

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const miniCssItem = {
  loader: MiniCssExtractPlugin.loader,
  options: { sourceMap: false, publicPath: '../', hmr: false }
}
// 层叠样式表加载
const styleItem = { loader: 'style-loader', options: { sourceMap: false } }
// vue层叠样式表加载
const vueStyleItem = { loader: 'vue-style-loader', options: { sourceMap: false } }
// 将 CSS 转化成 CommonJS 模块
const cssItem = { loader: 'css-loader', options: { sourceMap: false } }
// 将 postcss 编译成 CSS
const postcssItem = {
  loader: 'postcss-loader',
  options: { sourceMap: false, plugins: [require('autoprefixer')] }
}

// sassloader
const sassItem = {
  loader: 'sass-loader',
  options: {
    sourceMap: false,
    sassOptions: {
      outputStyle: 'expanded',
      compress: false
    }
  }
}
// lessLoader
const lessItem = { loader: 'less-loader', options: { sourceMap: false } }
// stylusLoader
const stylusItem = { loader: 'stylus-loader', options: { sourceMap: false } }

const px2remItem = { loader: 'px2rem-loader', options: { remUnit: 100, remPrecision: 8 } }

const cssLoader = (prodMode = false, isVue = false) => {
  let rule = {
    test: /\.css$/i,
    use: [
      prodMode ? miniCssItem : isVue ? vueStyleItem : styleItem, // 生产环境用分割css，开发用层叠样式表
      cssItem,
      postcssItem,
      px2remItem
    ]
  }
  return rule
}

// 自动添加css前缀
const postcssLoader = (prodMode = false, isVue = false) => {
  return {
    test: /\.p(ost)?css$/,
    use: [
      prodMode ? miniCssItem : isVue ? vueStyleItem : styleItem, // 生产环境用分割css，开发用层叠样式表
      cssItem,
      postcssItem,
      px2remItem
    ]
  }
}

const sassLoader = (prodMode = false, isVue = false) => {
  return {
    test: /\.(sass)|(scss)$/,
    use: [
      prodMode ? miniCssItem : isVue ? vueStyleItem : styleItem, // 生产环境用分割css，开发用层叠样式表
      cssItem,
      postcssItem,
      px2remItem,
      sassItem
    ]
  }
}

const lessLoader = (prodMode = false, isVue = false) => {
  return {
    test: /\.less$/,
    use: [
      prodMode ? miniCssItem : isVue ? vueStyleItem : styleItem, // 生产环境用分割css，开发用层叠样式表
      cssItem,
      postcssItem,
      px2remItem,
      lessItem
    ]
  }
}

const stylusLoader = (prodMode = false, isVue = false) => {
  return {
    test: /\.styl(us)?$/,
    use: [
      prodMode ? miniCssItem : isVue ? vueStyleItem : styleItem, // 生产环境用分割css，开发用层叠样式表
      cssItem,
      postcssItem,
      stylusItem
    ]
  }
}

const jsLoader = () => {
  return {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('app'), resolve('common'), resolve('node_modules/knife')]
    // options: {
    //   presets: [
    //     {
    //       plugins: ['@babel/plugin-proposal-class-properties']
    //     }
    //   ]
    // }
  }
}

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
          cache: false
        }
      }
    ]
  }
}

/**
 * 获取rules
 * @returns {Array} rule[]
 */
module.exports = getRules = prodMode => {
  // TODO 后期接入react，暂时写死
  const isVue = true
  let rules = [vueLoader(), imageLoader(), svgLoader(), mediaLoader(), fontLoader(), cssLoader(prodMode, isVue), postcssLoader(prodMode, isVue), sassLoader(prodMode, isVue), jsLoader(), eslintLoader()]
  return rules
}
