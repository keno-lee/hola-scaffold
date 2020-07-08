const fs = require('fs');
const path = require('path');

/**
 * 复制文件夹
 * @param {string} from 源
 * @param {string} to 目标
 */
const copyFolder = (from: string, to: string): void => {
  const files = fs.readdirSync(from); // 文件夹目录
  if (fs.existsSync(to)) {
    files.forEach((file) => {
      let sourcePath = path.join(from, file);
      let targetPath = path.join(to, file);
      if (fs.statSync(sourcePath).isDirectory()) {
        copyFolder(sourcePath, targetPath);
      } else {
        fs.copyFileSync(sourcePath, targetPath);
      }
    });
  } else {
    fs.mkdirSync(to);
    copyFolder(from, to);
  }
};

export default copyFolder;
