hola-scaffold 是一个多模块项目(MPA)的脚手架工具，其中包含`hola-cli`脚手架工具，`hola-cli-service`基于 webpack 的多模块服务和`hola-static-service`静态资源服务用于您的快速测试

## 开始

首先在全局安装`$npm install hola-scaffold -g`

执行`$ hola`查看安装结果和所有命令

使用`$ hola create myapp`来创建你的第一个多模块项目吧

## packages

[hola-cli](./packages/hola-cli/README.md)
[hola-cli-service](./packages/hola-cli-service/README.md)
[hola-static-service](./packages/hola-static-service/README.md)

## 开发

- 下载地址

`git clone https://github.com/keno-lee/hola-cli.git`

- 执行命令

`npm install` 安装依赖

`npm link` 写入全局命令

## lerna.js

- 定义：
  - Lerna 是一个用来优化托管在 git\npm 上的多 package 代码库的工作流的一个管理工具,可以让你在主项目下管理多个子项目，从而解决了多个包互相依赖，且发布时需要手动维护多个包的问题。
- 安装
  - `$ mkdir lerna-repo && cd $_`
  - `$ npx lerna init`
- 配置 lerna.json
  - `version: "independent"` - Independent mode 多包独立版本模式
  - `version: "0.0.1"` - Fixed/Locked mode(default) 统一管理模式
- 命令

1. `$ lerna init` 初始化项目

2. `lerna.json` 配置修改

3. `$ lerna create <包名> [路径目录]` 生成 npm 包

4. `$ lerna add 包名 [--scope=特定的某个包] [--dev]` 添加依赖。可以使用 `scope` 指定在某包下安装，如无则会为每个包都安装此包。dev 选项代表依赖添加进 devDependencies 中，如无则安装在 dependencies 中

5. `$ lerna list [-l]` 查看所有包信息

6. `$ lerna bootstrap` 安装所有的依赖

```js
A 模块依赖了 B
在 A 中 package.json中添加
"dependencies": {
  "B": "^1.0.0"
}
在项目根目录执行 `lerna bootstrap` ，
会在 A 的 `node_modules` 中安装 B（实际是快捷方式，linux中叫做软链接）
并且 B 修改的内容会在 A 中及时生效
```

7. `$ lerna import <pathToRepo> --dest=工程下的位置` 导入本地某包

8. `$ lerna clean` 删除所有的 node_modules

9. `$ lerna run 命令 [--scope=特定的某个包]` 运行某个包的某个命令

10. `$ lerna diff` 和 git diff 基本没区别，会显示工程下所有的修改

11. `$ lerna changed` 查看可以发布的包

12. `$ lerna publish [--dist-tag=tag名]` 发布。dist-tag 选项可以发版一个其他分支的包

```
Patch (0.0.2) - 补丁
Minor (0.1.0) - 次要
Major (1.0.0) - 主要
Prepatch (0.0.2-alpha.0) - 预发布补丁
Preminor (0.1.0-alpha.0) - 预发布次要
Premajor (1.0.0-alpha.0) - 预发布主要
Custom Prerelease - 自定义预发布
Custom Version - 自定义版本
```
