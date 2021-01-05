const packageInfo = require(resolve('./package.json'))

// 脚手架工具配置文件
module.exports = {
  // 框架语言
  framework: 'vue',

  // 测试服务器地址
  devServerUrl: '',

  // 引入路径别名配置
  resolveAlias: {},

  // 模块配置数组
  configs: [
    {
      moduleName: 'china',
      moduleEntry: './app/china/main.js',
      publicPath: {
        test: '/', // 测试环境静态资源地址 `environment=test`时生效
        prod: '/' // 生产环境CDN地址，`environment=production`时生效
      },
      // webpack环境变量注入
      env: {
        'process.env.PACKAGE_VERSION': JSON.stringify(packageInfo.version)
      }
    }
  ]
}
