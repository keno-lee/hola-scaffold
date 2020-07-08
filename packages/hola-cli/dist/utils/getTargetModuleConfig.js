"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loadUserOption_1 = __importDefault(require("./loadUserOption"));
const getTargetModuleConfig = (args) => {
    let userOption = loadUserOption_1.default();
    console.log(userOption);
    const argsModules = args && args.modules ? args.modules.split(',') : [];
    if (argsModules.length <= 0) {
        return userOption.configs;
    }
    let targetModulesConfigs = [];
    argsModules.map((argModule) => {
        userOption.configs.map((config) => {
            if (config.moduleName === argModule) {
                targetModulesConfigs.push(config);
            }
        });
    });
    return targetModulesConfigs;
};
exports.default = getTargetModuleConfig;
