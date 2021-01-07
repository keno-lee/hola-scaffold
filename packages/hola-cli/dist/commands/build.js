"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hola_cli_service_1 = require("hola-cli-service");
const inquirer_1 = __importDefault(require("inquirer"));
const chalk = require('chalk');
class BuildCommand {
    constructor() {
        this.command = 'build';
        this.describe = chalk.black.bold('打包多模块项目');
        this.handler = (args) => {
            this.getAnswers().then((answer) => {
                // console.log(answer);
                // console.log(args);
                hola_cli_service_1.build(args, answer.environment);
            });
        };
    }
    builder(argv) {
        return argv
            .usage(`\n${chalk.cyan('用法示例:')} \n  hola build -m="${chalk.cyan.bold('<moduleName1>')},${chalk.cyan.bold('<moduleName2>')},..."`)
            .options('m', {
            alias: 'modules',
            // describe: 'the modules you would like to build',
            describe: '你想要操作的目标模块集合',
            demandOption: false,
        });
    }
    getAnswers() {
        const questions = [
            {
                type: 'list',
                name: 'environment',
                // message: 'please choose which environment you want to build',
                message: '请选择你要构建的环境',
                choices: [
                    { name: 'Test', value: 'test' },
                    { name: 'Production', value: 'production' },
                ],
            },
        ];
        return inquirer_1.default.prompt(questions).then((answers) => answers);
    }
}
// module.exports = new BuildCommand();
exports.default = new BuildCommand();
