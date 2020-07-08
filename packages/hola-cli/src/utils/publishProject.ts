import request from 'request';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import async from 'async';

import loadUserOption from './loadUserOption';

const publishProject = (args) => {
  // 1. 找到需要上传的文件夹目录
  // 2. 遍历文件夹目录，生成执行数组
  // 3. async.parallel() 并行上传

  const modules = args && args.modules ? args.modules.split(',') : [];
  // 用户配置
  let userOption = loadUserOption();
  // 测试服务器地址
  let devServerUrl = args.server || (userOption && userOption.devServerUrl);
  // 上传源文件夹名称
  let sourceFolderName = args.folder || 'debug';
  // 是否有用户配置，适用于非hola-scaffold生成的项目
  const noconfigs = args.noconfigs || false;

  if (!devServerUrl) {
    console.log();
    console.log(chalk.red('缺少参数: 远程服务器地址!'));
    console.log();
    return;
  }

  let sourceFilePathList = [] as string[]; // 目标文件路径数组
  let noFoundModule = [] as string[]; // 收集未找到的模块
  if (noconfigs) {
    sourceFilePathList = getFolderFilePath(path.join(process.cwd(), sourceFolderName));
  } else {
    // 如果所选模块为空，则拿到所有模块
    if (modules.length <= 0) {
      userOption.configs.map((config) => {
        modules.push(config.moduleName);
      });
    }

    // 拿到文件件内所有文件路径 => sourceFilePathList
    modules.forEach((moduleName) => {
      let sourceFolderPath = path.join(process.cwd(), sourceFolderName, moduleName);
      // 判断是否存在需要上传文件夹的目录
      if (!fs.existsSync(sourceFolderPath)) {
        noFoundModule.push(moduleName);
        return;
      }
      sourceFilePathList = sourceFilePathList.concat(getFolderFilePath(sourceFolderPath));
    });
  }

  // console.log('sourceFilePathList', sourceFilePathList);

  create2run(devServerUrl, sourceFilePathList, noFoundModule);
};

/**
 * 发送文件至远程服务器
 * @param {string} serverUrl 远程服务器地址
 * @param {string} sourcePath 文件源地址
 * @param {string} destPath 服务器存储地址
 */
const uploadHttpService = async (serverUrl: string, sourcePath: string, destPath: string) => {
  return new Promise((resolve, reject) => {
    request(
      `${serverUrl}/upload`,
      {
        timeout: 20000,
        method: 'PUT',
        headers: {
          'cache-control': 'no-cache',
          'Content-Type': 'multipart/form-data',
        },
        formData: {
          dest: destPath, // 目标文件夹
          file: fs.createReadStream(sourcePath),
        },
      },
      (error) => {
        if (error) {
          // return console.error('upload failed:', error);
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};

/**
 * 获取目标文件夹内，所有文件的路径
 * @param {string} folderPath 目标文件夹路径
 */
const getFolderFilePath = (folderPath: string): string[] => {
  let pathArray = [] as string[];
  const files = fs.readdirSync(folderPath); // 文件夹目录

  files.forEach((file) => {
    let filePath = path.join(folderPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      pathArray = pathArray.concat(getFolderFilePath(filePath));
    } else {
      pathArray.push(filePath);
    }
  });
  return pathArray;
};

/**
 * 创建任务队列并执行
 * @param {string} serverUrl 远程服务器地址
 * @param {Array} sourceFilePathList 文件路径列表
 * @param {Array} noFoundModule 未发现模块
 */
const create2run = (serverUrl, sourceFilePathList, noFoundModule) => {
  // 建立任务队列
  let uploadQuene = [] as any[];
  sourceFilePathList.forEach((filePath) => {
    let fileRelativePath = path.relative(process.cwd(), filePath);
    // console.log('fileRelativePath', fileRelativePath);
    uploadQuene.push((callback) => {
      // filePath:         本地 dist/china/index.html
      // fileRelativePath: 远程 dist/china/index.html
      uploadHttpService(serverUrl, filePath, fileRelativePath)
        .then(() => {
          console.log(`${chalk.cyan(fileRelativePath)} => ${chalk.green('上传成功')}`);
          callback(null);
        })
        .catch((err) => {
          callback(err);
        });
    });
  });

  // 执行任务队列
  async.parallel(uploadQuene, (err) => {
    if (err) {
      console.log();
      console.log(chalk.red(`upload failed => ${err}`));
      console.log();
    } else {
      console.log();
      console.log(chalk.green(`可用模块上传成功`));
      console.log();
      if (noFoundModule.length > 0) {
        console.log(chalk.red(`未找到模块: ${noFoundModule}`));
        console.log();
      }
    }
  });
};

export default publishProject;
