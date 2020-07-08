const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const createProject = (projectName, config) => {
  // { projectName: 'hola-project', projectDescription: 'nihao' }
  // console.log('config', config);

  // /Users/keno/Documents/hobby-code/hola/packages/hola-cli/hola-project
  const folderPath = path.join(process.cwd(), projectName); // 获取目标绝对路径
  const templatePath = path.join(__dirname, '../../templates/vue-project');

  // 如果存在该路径，则报错  && fs.statSync(folderPath).isDirectory()
  if (fs.existsSync(folderPath)) {
    console.log();
    console.log(chalk.red('目录下此文件夹名已存在，请检查后再继续'));
    console.log();
    return;
  }

  console.log();
  console.log(`✨  Creating project in ${chalk.yellow('folderPath')}`);
  console.log();

  fs.mkdirSync(folderPath); // 创建文件夹

  copyFolder(templatePath, folderPath);

  console.log(
    `${chalk.green('🎉  Successfully created project ')} ${chalk.cyan(projectName)}`
  );
  console.log(chalk.green('👉  Get started with the following commands:'));
  console.log();
  console.log(`$ ${chalk.cyan(`cd ${projectName}`)}`);
  console.log(`$ ${chalk.cyan('npm install')}`);
  console.log(`$ ${chalk.cyan('npm run serve')}`);
  console.log();
};

/**
 * 复制文件夹
 * @param {string} from 源
 * @param {string} to 目标
 */
const copyFolder = (from, to) => {
  const files = fs.readdirSync(from); // 文件夹目录
  if (fs.existsSync(to)) {
    files.forEach((file) => {
      let sourePath = path.join(from, file);
      let targetPath = path.join(to, file);
      if (fs.statSync(sourePath).isDirectory()) {
        copyFolder(sourePath, targetPath);
      } else {
        fs.copyFileSync(sourePath, targetPath);
      }
    });
  } else {
    fs.mkdirSync(to);
    copyFolder(from, to);
  }

  // console.log();
  // console.log(chalk.green('项目创建完成'));
  // console.log();
};

export default createProject;
