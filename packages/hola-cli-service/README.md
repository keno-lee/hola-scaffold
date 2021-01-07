# hola-cli-service

> service for hola-cli

## 开始

1. 安装依赖

> `$ npm install hola-cli-service`

2. 配置 hola.config.js

> ```js
>  configs: [
>    {
>      moduleName: 'china',
>      moduleEntry: './app/china/main.js',
>      publicPath: {
>        test: '/',
>        prod: '/'
>      },
>      // webpack环境变量注入
>      env: {}
>    }
>  ],
> ```

3. 配置命令

> ```json
> "scripts": {
>   "dev": "hola-cli-service serve",
>   "build": "hola-cli-service build"
> },
> ```

4. 启动服务

> `$ npm run dev`
