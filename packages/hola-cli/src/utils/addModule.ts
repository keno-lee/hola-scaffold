const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
import copyFolder from './copyFolder';
import updateHolaConfigs from './updateHolaConfigs';

const addModule = (moduleName, config) => {
  // console.log('moduleName', moduleName);
  // 1. 拿到模板，替换名字
  // 2. 复制文件夹到目标地
  // 3. 更新目标项目配置文件，hola.config.js

  const appPath = path.join(process.cwd(), 'app'); // 获取目标绝对路径
  const templatePath = path.join(__dirname, '../../templates/vue-project/app/module');
  const targetPath = path.join(appPath, moduleName);

  if (!fs.existsSync(appPath)) {
    // 查询当前执行命令的地方是否有该路径，如无，则报错
    console.log();
    console.log(chalk.red('请在项目根目录执行该命令'));
    console.log();
    return;
  }

  // 如果存在该路径，则报错  && fs.statSync(folderPath).isDirectory()
  if (fs.existsSync(targetPath)) {
    console.log();
    console.log(chalk.red('已存在同名模块，请检查后再继续'));
    console.log();
    return;
  }

  // 复制文件夹
  copyFolder(templatePath, targetPath);

  const addCode = {
    moduleName: moduleName,
    moduleEntry: `./app/${moduleName}/main.js`,
    cdn: '/',
  };
  // 更新hola配置
  updateHolaConfigs(addCode);

  console.log();
  console.log(`${chalk.green('🎉  Successfully added module ')} ${chalk.cyan(moduleName)}`);
  console.log(chalk.green('👉  Get started with the following commands:'));
  console.log();
  console.log(`$ ${chalk.cyan('hola serve')}`);
  console.log(`$ ${chalk.cyan('hola build')}`);
  console.log();
};

export default addModule;
