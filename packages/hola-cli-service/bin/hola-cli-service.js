#!/usr/bin/env node
const yargs = require('yargs');
const chalk = require('chalk');
const version = require('../package.json').version;

const Service = require('../src/Service');

// 第一种 hola-cli-service serve -m=xx,yy 环境由问答收集
// 第二种 hola-cli-service build --modules=xx,yy -env='test'
// Sercice只接收最终的配置文件，所有配置收集由各自完成

yargs
  .command('serve', chalk.black.bold('启动多模块项目本地服务'), (args) => {
    // console.log(args.argv);
    new Service(process.cwd()).run('serve', args.argv);
  })
  .command('build', chalk.black.bold('打包多模块项目'), (args) => {
    // console.log(args.argv);
    new Service(process.cwd()).run('build', args.argv);
  })
  .options('m', {
    alias: 'modules',
    describe: '你想要操作的目标模块集合',
    demandOption: false
  })
  .options('e', {
    alias: 'environment',
    describe: '你想要运行的目标代码环境',
    demandOption: false
  })
  .usage(`\n${chalk.cyan('用法示例:')} \n  hola-cli-service <command> [options]`)
  .demandCommand(1, chalk.red('warning: 至少需要 1 个 <命令> 才能继续'))
  .updateStrings({
    'Commands:': chalk.cyan('命令:'),
    'Options:': chalk.cyan('选项:')
  })
  .version(version)
  .alias('h', 'help')
  .alias('v', 'version').argv;
