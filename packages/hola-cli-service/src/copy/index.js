const path = require('path');
const chalk = require('chalk');

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const userOptions = require(path.join(process.cwd(), './hola.config.js'));
const getEntry = require('./src/utils/getEntry');
const { getConfig, getDevServer } = require('./src/config/index');
const isVue = userOptions.framework === 'vue'; // get framework

exports.serve = async (args) => {
  console.log(chalk.green.bold('正在启动开发服务器...'));

  // get target entrys
  let targetEntry = getEntry(
    userOptions.entry,
    args && args.modules ? args.modules.split(',') : []
  );

  // get devWebpack config
  let config = getConfig(false, targetEntry);

  let devServer = await getDevServer();

  // create compiler
  const compiler = Webpack(config);
  // create server
  const server = new WebpackDevServer(compiler, devServer);

  // SIGINT 程序终止(interrupt)信号, 在用户键入INTR字符(通常是Ctrl-C)时发出
  // SIGTERM 程序结束(terminate)信号, 与SIGKILL不同的是该信号可以被阻塞和处理. 通常用来要求程序自己正常退出. shell命令kill缺省产生这个信号.
  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => {
      server.close(() => {
        process.exit(0);
      });
    });
  });

  return new Promise((resolve, reject) => {
    // log instructions when first compiler
    let isFirstCompile = true;
    // compiler hooks
    compiler.hooks.done.tap('hola-cli-service serve', (stats) => {
      if (stats.hasErrors()) {
        return;
      }

      //  DONE  Compiled successfully in 1924ms
      //  DONE  Compiled successfully in 5665ms
      //  App running at:
      //  - Local:   http://localhost:1123/
      //  - Network: http://172.16.45.180:1123/

      //  Note that the development build is not optimized.
      //  To create a production build, run npm run build.

      //  WAIT  Compiling...                    18:47:19

      //  98% after emitting CopyPlugin

      //  DONE  Compiled successfully in 262ms  18:47:20

      //   App running at:
      //   - Local:   http://localhost:1123/
      //   - Network: http://172.16.45.180:1123/

      console.log();
      console.log(`  App running at:`);
      console.log(`  - Local:   ${chalk.cyan(`http://localhost:${devServer.port}/`)}`);
      console.log(`  - Network: ${chalk.cyan(`http://${devServer.host}:${devServer.port}/`)}`);
      console.log();

      if (isFirstCompile) {
        isFirstCompile = false;
        console.log(`  Note that the development build is not optimized.`);
        console.log(`  To create a production build, run ${chalk.cyan('hola build')}.`);
      }

      // resolve returned Promise
      // so other commands can do api.service.run('serve').then(...)
      resolve({
        server,
      });
    });

    server.listen(devServer.port, devServer.host, (err) => {
      if (err) {
        reject(err);
      }
    });
  });
};

exports.build = (args) => {
  console.log(chalk.green.bold('正在打包...'));

  // get target entrys
  let targetEntry = getEntry(
    userOptions.entry,
    args && args.modules ? args.modules.split(',') : []
  );

  // get devWebpack config
  // let config = getProdWebpackConfig(targetEntry);
  let config = getConfig(true, targetEntry);

  return new Promise((resolve, reject) => {
    let compiler = Webpack(config);

    compiler.run((err, stats) => {
      if (err) {
        console.log(111);
        return reject(err);
      }

      if (stats.hasErrors()) {
        console.log(222);
        console.log(stats);
      }
    });
  });
};
