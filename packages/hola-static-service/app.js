const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const portfinder = require('portfinder'); // 端口号
const address = require('address');
const multiparty = require('multiparty');

portfinder.basePort = 2222; // 默认端口号

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Cache-Control, X-Api-Env, X-Client-Id');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

// 上传文件接口
app.put('/upload', (req, res) => {
  const form = new multiparty.Form({ uploadDir: './tmp' });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      res.send('upload failed!');
      return;
    }
    if (fields) {
      // console.log('upload success!');
      res.send('upload success!');
      // console.log(fields); // { dest: [ 'debug/china/js/bundle.76f15bf8.js' ] }
      // { file:
      //   [ { fieldName: 'file',
      //       originalFilename: 'bundle.76f15bf8.js',
      //       path: 'debug/yue8OYZdPMigAd5yD8pMzNPi.js',
      //       headers: [Object],
      //       size: 6503 } ]
      //     }
      const oldName = files.file[0].path; // debug/yue8OYZdPMigAd5yD8pMzNPi.js
      const newPath = fields.dest[0]; // debug/
      // console.log('oldName', oldName);
      // console.log('newPath', newPath);

      // 生成文件夹
      if (createFolder(path.join(process.cwd(), path.dirname(fields.dest[0])))) {
        fs.rename(oldName, newPath, (err) => {
          if (err) throw err;
          // console.log('重命名完成');
        });
      }
    }
  });
});

// 静态资源访问路径
app.use(express.static('./debug'));

// 启动服务
portfinder.getPortPromise().then((port) => {
  app.listen(port, () => {
    console.log(`copy path to your project configs: ${address.ip()}:${port}`);
  });
});

// debug/china/js/xxx.js
// createFolder('debug/china/js/')
/**
 * 递归生成文件夹
 * @example folderPath = debug/china/js/ 生成 /debug/china/js/文件夹
 * @param {string} folderPath 文件夹路径
 */
function createFolder(folderPath) {
  if (fs.existsSync(folderPath)) {
    // 如果存在
    return true;
  } else {
    // 如果不存在，先判断上一级存不存在 debug/china
    // 如果存在就，生成当前的文件夹
    if (createFolder(path.dirname(folderPath))) {
      fs.mkdirSync(folderPath);
      return true;
    }
  }
}
