import { CommandModule, Argv } from 'yargs';
import chalk from 'chalk';
import inquirer, { Question, CheckboxChoiceOptions, Answers } from 'inquirer';
import createProject from '../utils/createProject';

class CreateCommand implements CommandModule {
  public command = 'create';

  public describe = chalk.black.bold('创建新的项目');

  // aliases;

  public builder(argv: Argv) {
    return argv
      .usage(`\n${chalk.cyan('用法示例:')} \n  hola create ${chalk.cyan.bold('<projectName>')}`) // usage:
      .demandCommand(1, chalk.red('warning: 需要指定 1 个 <项目名> 才能继续')) // warning:
      .command('myApp', '=>  create a new project called myApp', () => {}, this.handler); // Scaffolds:
  }

  // 必须使用箭头函数，否则无法找到this
  public handler = (argv) => {
    // console.log(argv._[1]);

    this.getAnswers().then((answers) => {
      // console.log(answers);
      createProject(argv._[1], answers);
    });
  };

  private getAnswers(): Promise<Answers> {
    const questions = [
      {
        type: 'list',
        name: 'framework',
        message: 'framework choose',
        choices: [
          { name: 'vue', value: 'vue' },
          // { name: 'react', value: 'react' } // 暂时不支持react
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
      // {
      //   type: 'input',
      //   name: 'projectDescription',
      //   message: 'project desc:',
      // },
      // {
      //   type: 'list',
      //   name: 'applicationType',
      //   message: 'application type',
      //   choices: [
      //     { name: 'Single Page Application', value: 'single' },
      //     { name: 'Multi Page Application', value: 'multi' }
      //   ]
      // }
    ];
    return inquirer.prompt(questions).then((answers: Answers) => answers);
  }
}

module.exports = new CreateCommand();
