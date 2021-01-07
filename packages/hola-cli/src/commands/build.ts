import { CommandModule, Argv } from 'yargs';
import { build } from 'hola-cli-service';
import inquirer, { Question, CheckboxChoiceOptions, Answers } from 'inquirer';

const chalk = require('chalk');

class BuildCommand implements CommandModule {
  public command = 'build';

  public describe = chalk.black.bold('打包多模块项目');

  public builder(argv: Argv) {
    return argv
      .usage(
        `\n${chalk.cyan('用法示例:')} \n  hola build -m="${chalk.cyan.bold(
          '<moduleName1>'
        )},${chalk.cyan.bold('<moduleName2>')},..."`
      )
      .options('m', {
        alias: 'modules',
        // describe: 'the modules you would like to build',
        describe: '你想要操作的目标模块集合',
        demandOption: false,
      });
  }

  public handler = (args) => {
    this.getAnswers().then((answer) => {
      // console.log(answer);
      // console.log(args);
      build(args, answer.environment);
    });
  };

  private getAnswers(): Promise<Answers> {
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
    return inquirer.prompt(questions).then((answers: Answers) => answers);
  }
}

// module.exports = new BuildCommand();
export default new BuildCommand();
