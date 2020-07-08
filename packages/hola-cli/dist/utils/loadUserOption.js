"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const chalk = require('chalk');
const loadUserOption = () => {
    // 初始化加载用户数据 hola.config.js
    const jsConfigPath = path.resolve(process.cwd(), 'hola.config.js');
    try {
        const userOption = loadConfig(jsConfigPath);
        return userOption;
    }
    catch (e) {
        if (e.code !== 'MODULE_NOT_FOUND') {
            // error(`Error loading ${chalk.bold('hola.config.js')}:`);
            console.log(`   ${chalk.red('警告: ')}`);
            console.log(`   ${chalk.bold('hola.config.js')} 配置文件加载失败:`);
            throw e;
        }
    }
};
const loadConfig = (configPath) => {
    let fileConfig = require(configPath);
    if (typeof fileConfig === 'function') {
        fileConfig = fileConfig();
    }
    if (!fileConfig || typeof fileConfig !== 'object') {
        console.error(`Error loading ${chalk.bold('vue.config.js')}: should export an object or a function that returns object.`);
        fileConfig = null;
    }
    return fileConfig;
};
exports.default = loadUserOption;
