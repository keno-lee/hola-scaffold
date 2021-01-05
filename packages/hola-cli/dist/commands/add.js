"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const argv = require('yargs');
const chalk = require('chalk');
const inquirer_1 = __importDefault(require("inquirer"));
const addModule_1 = __importDefault(require("../utils/addModule"));
class CreateCommand {
    constructor() {
        this.command = 'add';
        this.describe = chalk.black.bold('增加新的模块'); // add new module
        this.handler = (argv) => {
            // console.log(argv, argv._[1]);
            this.getAnswers().then((answers) => {
                addModule_1.default(argv._[1], answers);
            });
        };
    }
    // aliases;
    builder(argv) {
        return argv
            .usage(`\n${chalk.cyan('用法示例:')} \n  hola add ${chalk.cyan.bold('<moduleName>')}`)
            .demandCommand(1, chalk.red('warning: 需要 1 个 <模块名> 才能继续'))
            .command('home', '=>  add a new module called home', () => { }, this.handler); // Scaffolds:
    }
    getAnswers() {
        const questions = [
            {
                type: 'list',
                name: 'framework',
                message: 'framework choose',
                choices: [
                    { name: 'Vue移动端', value: 'vue' },
                ],
            },
        ];
        return inquirer_1.default.prompt(questions).then((answers) => answers);
    }
}
module.exports = new CreateCommand();
