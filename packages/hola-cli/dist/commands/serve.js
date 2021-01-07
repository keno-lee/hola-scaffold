"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hola_cli_service_1 = require("hola-cli-service");
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
            describe: '你想要操作的目标模块集合',
            demandOption: false
        });
    }
    handler(args) {
        hola_cli_service_1.serve(args);
    }
}
module.exports = new ServeCommand();
