const serve = require('./commands/serve');
const build = require('./commands/build');
const path = require('path');
const chalk = require('chalk');
const { getDevServer, getConfigArray } = require('./config/index');
// const merge = require('webpack-merge')

module.exports = class Service {
  constructor(context) {
    this.context = context;
  }

  /**
   * 加载用户配置(hola.config.js)
   */
  async loadUserOption() {
    return new Promise((resolve, reject) => {
      // 初始化加载用户数据 hola.config.js
      const jsConfigPath = path.resolve(this.context, 'hola.config.js');
      try {
        // 获取hola.config
        const holaConfig = loadConfig(jsConfigPath);
        // 模块配置数组
        this.modulesOptionsArr = holaConfig.configs;
        delete holaConfig.configs;
        // 获取公共配置
        this.commonOptionObj = holaConfig;
        resolve();
      } catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
          console.log(`   ${chalk.red('警告: 配置数据加载失败!')}`);
          console.log();
          console.log(`   ${chalk.bold('hola.config.js')} 未找到该文件!!!`);
          console.log();
        } else {
          throw e;
        }
      }
    });
  }

  /**
   * 获取目标模块配置
   * @param {Object} allModule 模块集合
   * @returns {array} webpackConfig[] 配置集合
   */
  getTargetModulesConfigs(argsModules) {
    // 如果目标模块为空，则返回全部模块
    if (argsModules.length <= 0) {
      return this.modulesOptionsArr;
    }
    let targetModulesConfigs = [];
    argsModules.map((argModule) => {
      this.modulesOptionsArr.map((config) => {
        if (config.moduleName === argModule) {
          targetModulesConfigs.push(config);
        }
      });
    });
    return targetModulesConfigs;
  }

  /**
   * 初始化配置
   * @param {Object} args 命令行参数
   */
  async init(args) {
    console.log();
    console.log(chalk.green.bold(`   加载配置数据中...`));
    console.log();

    await this.loadUserOption();

    // 目标参数模块 [china, us]
    const argsModules = args && args.modules ? args.modules.split(',') : [];
    this.targetModules = this.getTargetModulesConfigs(argsModules);
  }

  /**
   * 启动webpack服务
   * @param {String} command 'serve' | 'build'
   * @param {String} args.modules 命令行参数-目标模块集合，如果是空，则全部打包
   * @param {Object} args.environment 命令行参数-运行环境，枚举:development:开发环境;test:测试环境;production:生产环境·
   */
  async run(command, args) {
    await this.init(args);

    if (command === 'serve') {
      const configs = getConfigArray(this.targetModules, {
        ...this.commonOptionObj,
        environment: 'development'
      });
      const devServer = await getDevServer();
      serve(configs, devServer, this.targetModules);
    }

    if (command === 'build') {
      const configs = getConfigArray(this.targetModules, {
        ...this.commonOptionObj,
        environment: args.environment || 'production'
      });
      await build(configs);

      console.log(chalk.green.bold(`App build completed!`));
      console.log();
    }
  }
};

function loadConfig(configPath) {
  let fileConfig = require(configPath);

  if (typeof fileConfig === 'function') {
    fileConfig = fileConfig();
  }

  if (!fileConfig || typeof fileConfig !== 'object') {
    error(
      `Error loading ${chalk.bold(
        'hola.config.js'
      )}: should export an object or a function that returns object.`
    );
    fileConfig = null;
  }
  return fileConfig;
}
