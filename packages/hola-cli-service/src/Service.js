const serve = require('./commands/serve');
const build = require('./commands/build');
const path = require('path');
const chalk = require('chalk');
const { getConfig, getDevServer, getConfigArray } = require('./config/index');
const merge = require('webpack-merge');

const fs = require('fs');
module.exports = class Service {
  constructor(context) {
    this.context = context;
  }

  loadUserOption() {
    // 初始化加载用户数据 hola.config.js
    const jsConfigPath = path.resolve(this.context, 'hola.config.js');
    try {
      this.userOption = loadConfig(jsConfigPath);
    } catch (e) {
      if (e.code !== 'MODULE_NOT_FOUND') {
        // error(`Error loading ${chalk.bold('hola.config.js')}:`);
        console.log(`   ${chalk.red('警告: ')}`);
        console.log(`   ${chalk.bold('hola.config.js')} 配置文件加载失败:`);
        throw e;
      }
    }
  }

  /**
   * @param {Object} allModule
   * @returns {array} webpackConfig[]
   */
  getTargetModulesConfigs(argsModules) {
    if (argsModules.length <= 0) {
      return this.userOption.configs;
    }
    let targetModulesConfigs = [];
    argsModules.map((argModule) => {
      this.userOption.configs.map((config) => {
        if (config.moduleName === argModule) {
          targetModulesConfigs.push(config);
        }
      });
    });
    return targetModulesConfigs;
  }

  init(args) {
    console.log();
    console.log(chalk.green.bold(`收集配置数据中...`));
    console.log();

    this.loadUserOption();
    // 目标参数模块 [china, us]
    const argsModules = args && args.modules ? args.modules.split(',') : [];
    this.targetModules = this.getTargetModulesConfigs(argsModules);
  }

  async run(command, args, outputDir) {
    this.init(args);

    if (command === 'serve') {
      const configs = getConfigArray(this.targetModules, false);
      const devServer = await getDevServer();

      serve(configs, devServer);
      // .catch((err) => {
      //   console.log(err);
      //   process.exit(1);
      // });
    }

    if (command === 'build') {
      const configs = getConfigArray(this.targetModules, true, outputDir);
      build(configs);
    }
  }
};

const loadConfig = (configPath) => {
  let fileConfig = require(configPath);

  if (typeof fileConfig === 'function') {
    fileConfig = fileConfig();
  }

  if (!fileConfig || typeof fileConfig !== 'object') {
    error(
      `Error loading ${chalk.bold(
        'vue.config.js'
      )}: should export an object or a function that returns object.`
    );
    fileConfig = null;
  }
  return fileConfig;
};
