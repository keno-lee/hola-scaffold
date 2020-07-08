"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const createProject_1 = __importDefault(require("../utils/createProject"));
class CreateCommand {
    constructor() {
        this.command = 'create';
        this.describe = chalk_1.default.black.bold('创建新的项目');
        // 必须使用箭头函数，否则无法找到this
        this.handler = (argv) => {
            // console.log(argv._[1]);
            this.getAnswers().then((answers) => {
                // console.log(answers);
                createProject_1.default(argv._[1], answers);
            });
        };
    }
    // aliases;
    builder(argv) {
        return argv
            .usage(`\n${chalk_1.default.cyan('用法示例:')} \n  hola create ${chalk_1.default.cyan.bold('<projectName>')}`) // usage:
            .demandCommand(1, chalk_1.default.red('warning: 需要指定 1 个 <项目名> 才能继续')) // warning:
            .command('myApp', '=>  create a new project called myApp', () => { }, this.handler); // Scaffolds:
    }
    getAnswers() {
        const questions = [
            {
                type: 'list',
                name: 'framework',
                message: 'framework choose',
                choices: [
                    { name: 'vue', value: 'vue' },
                ],
            },
            // {
            //   type: 'input',
            //   name: 'projectName',
            //   message: 'project name:',
            //   default: 'hola-project',
            //   validate: (input) => /^[^0-9]?[-_A-Za-z0-9]+$/.test(input),
            // },
            {
                type: 'input',
                name: 'projectDescription',
                message: 'project desc:',
            },
        ];
        return inquirer_1.default.prompt(questions).then((answers) => answers);
    }
}
module.exports = new CreateCommand();
