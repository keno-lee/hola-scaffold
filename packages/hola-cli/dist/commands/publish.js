"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const publishProject_1 = __importDefault(require("../utils/publishProject"));
class PublishCommand {
    constructor() {
        this.command = 'publish';
        this.describe = chalk_1.default.black.bold('测试环境发布模块代码');
    }
    builder(argv) {
        return argv
            .usage(`\n${chalk_1.default.cyan('用法示例:')} \n  hola publish -m="${chalk_1.default.cyan.bold('<moduleName1>')},${chalk_1.default.cyan.bold('<moduleName2>')},..."`)
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
    handler(args) {
        // console.log(args);
        publishProject_1.default(args);
    }
}
module.exports = new PublishCommand();
