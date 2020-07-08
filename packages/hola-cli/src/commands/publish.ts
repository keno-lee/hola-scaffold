import { CommandModule, Argv } from 'yargs';
import chalk from 'chalk';
import publishProject from '../utils/publishProject';

class PublishCommand implements CommandModule {
  public command = 'publish';

  public describe = chalk.black.bold('测试环境发布模块代码');

  public builder(argv: Argv) {
    return argv
      .usage(
        `\n${chalk.cyan('用法示例:')} \n  hola publish -m="${chalk.cyan.bold(
          '<moduleName1>'
        )},${chalk.cyan.bold('<moduleName2>')},..."`
      )
      .options('m', {
        alias: 'modules',
        // describe: 'the modules you would like to publish',
        describe: '你要发布到远程服务器的模块',
        demandOption: false,
      })
      .options('s', {
        alias: 'server',
        describe: '你要发布的远程服务器地址',
        demandOption: false,
      })
      .options('f', {
        alias: 'folder',
        describe: '你要发布的源文件夹',
        demandOption: false,
      });
  }

  public handler(args) {
    // console.log(args);
    publishProject(args);
  }
}
module.exports = new PublishCommand();
