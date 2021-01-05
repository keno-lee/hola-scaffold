# hola-cli-service

## 问题探讨

1. 多模块项目，使用 `multiCompiler`。开发时会导致编译速度变慢，且进程插件有问题

解决： 开发使用 `webpack` 多入口，生产使用 `multiCompiler` 和 `parallel-webpack`

2. webpack 有 `单模块单配置`、`多模块单配置`、`多模块多配置`

多模块单配置: 适用于开发环境，避免部分插件的冲突问题

多模块多配置: 适用于生产环境，速度更快，打包文件分开更清晰

## multiCompiler

webpack 支持 multiCompiler，但是不会并行执行

并行处理使用第三方解决方案，例如 parallel-webpack

```js
var webpack = require('webpack')

webpack(
  [
    { entry: './index1.js', output: { filename: 'bundle1.js' } },
    { entry: './index2.js', output: { filename: 'bundle2.js' } }
  ],
  (err, stats) => {
    process.stdout.write(stats.toString() + '\n')
  }
)
```
