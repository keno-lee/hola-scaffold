import { CommandModule, Argv } from 'yargs';
import { serve } from 'hola-cli-service';

const chalk = require('chalk');
class ServeCommand implements CommandModule {
  public command = 'serve';

  public describe = chalk.black.bold('启动多模块项目');

  public builder(argv: Argv) {
    return argv
      .usage(
        `\n${chalk.cyan('用法示例:')} \n  hola serve -m="${chalk.cyan.bold(
          '<moduleName1>'
        )},${chalk.cyan.bold('<moduleName2>')},..."`
      )
      .options('m', {
        alias: 'modules',
        describe: '你想要操作的目标模块集合',
        demandOption: false
      });
  }

  public handler(args) {
    serve(args);
  }
}

module.exports = new ServeCommand();
