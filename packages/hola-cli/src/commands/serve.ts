import { CommandModule, Argv } from 'yargs';
import { buiserveld } from 'hola-cli-service';
import loadCommand from '../utils/loadCommand';

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
        describe: 'the modules you would like to serve',
        demandOption: false,
      });
  }

  public handler(args) {
    serve(args);
    // loadCommand('serve', 'hola-cli-service').serve(args);
  }
}

module.exports = new ServeCommand();
