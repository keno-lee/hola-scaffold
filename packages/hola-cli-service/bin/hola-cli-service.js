#!/usr/bin/env node
const yargs = require('yargs');
const chalk = require('chalk');
const version = require('../package.json').version;

const Service = require('../src/Service');

yargs
  .command('serve', chalk.black.bold('启动多模块项目本地服务'), (args) => {
    // console.log(1111);
    // console.log(args);
    new Service(process.cwd()).run('serve', args);
  })
  .command('build', chalk.black.bold('打包多模块项目'), (args) => {
    console.log(2222);
    console.log(args);
    new Service(process.cwd()).run('build', args);
  })
  .usage(`\n${chalk.cyan('用法示例:')} \n  hola-cli-service <command> [options]`)
  .demandCommand(1, chalk.red('warning: 至少需要 1 个 <命令> 才能继续'))
  .updateStrings({
    'Commands:': chalk.cyan('命令:'),
    'Options:': chalk.cyan('选项:'),
  })
  .version(version)
  .alias('h', 'help')
  .alias('v', 'version').argv;
