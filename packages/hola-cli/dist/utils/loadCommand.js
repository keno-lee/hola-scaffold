"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loadCommand(commandName, moduleName) {
    const isNotFoundError = (err) => {
        return err.message.match(/Cannot find module/);
    };
    try {
        return require(moduleName);
    }
    catch (err) {
        if (isNotFoundError(err)) {
            try {
                return require('import-global')(moduleName);
            }
            catch (err2) {
                if (isNotFoundError(err2)) {
                    const chalk = require('chalk');
                    let installCommand = `npm install -g`;
                    console.log();
                    console.log(`  Command ${chalk.cyan(`hola ${commandName}`)} requires a global addon to be installed.\n` +
                        `  Please run ${chalk.cyan(`${installCommand} ${moduleName}`)} and try again.`);
                    console.log();
                    process.exit(1);
                }
                else {
                    throw err2;
                }
            }
        }
        else {
            throw err;
        }
    }
}
exports.default = loadCommand;
