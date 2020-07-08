"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
class ServeCommand {
    constructor() {
        this.command = 'serve';
        this.describe = chalk.black.bold('启动多模块项目');
    }
    builder(argv) {
        return argv
            .usage(`\n${chalk.cyan('用法示例:')} \n  hola serve -m="${chalk.cyan.bold('<moduleName1>')},${chalk.cyan.bold('<moduleName2>')},..."`)
            .options('m', {
            alias: 'modules',
            describe: 'the modules you would like to serve',
            demandOption: false,
        });
    }
    handler(args) {
        serve(args);
        // loadCommand('serve', 'hola-cli-service').serve(args);
    }
}
module.exports = new ServeCommand();
