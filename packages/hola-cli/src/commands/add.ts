import { CommandModule, Argv } from 'yargs';
// const argv = require('yargs');
const chalk = require('chalk');
import inquirer, { Question, CheckboxChoiceOptions, Answers } from 'inquirer';
import addModule from '../utils/addModule';

class CreateCommand implements CommandModule {
  public command = 'add';

  public describe = chalk.black.bold('增加新的模块'); // add new module

  // aliases;
  public builder(argv: Argv) {
    return argv
      .usage(`\n${chalk.cyan('用法示例:')} \n  hola add ${chalk.cyan.bold('<moduleName>')}`)
      .demandCommand(1, chalk.red('warning: 需要 1 个 <模块名> 才能继续'))
      .command('home', '=>  add a new module called home', () => {}, this.handler); // Scaffolds:
  }

  public handler = (argv) => {
    // console.log(argv, argv._[1]);
    this.getAnswers().then((answers) => {
      addModule(argv._[1], answers);
    });
  };

  private getAnswers(): Promise<Answers> {
    const questions = [
      {
        type: 'list',
        name: 'framework',
        message: 'framework choose',
        choices: [
          { name: 'Vue移动端', value: 'vue' },
          // { name: 'react', value: 'react' } // 暂时不支持react
        ],
      },
      // {
      //   type: 'input',
      //   name: 'moduleName',
      //   message: 'module name:',
      //   default: 'module-new',
      //   validate: (input) => /^[^0-9]?[-_A-Za-z0-9]+$/.test(input),
      // },
    ];
    return inquirer.prompt(questions).then((answers: Answers) => answers);
  }
}

module.exports = new CreateCommand();
