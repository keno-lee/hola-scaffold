import loadUserOption from './loadUserOption';

const getTargetModuleConfig = (args) => {
  let userOption = loadUserOption();
  console.log(userOption);

  const argsModules = args && args.modules ? args.modules.split(',') : [];

  if (argsModules.length <= 0) {
    return userOption.configs;
  }

  let targetModulesConfigs = [] as object[];

  argsModules.map((argModule) => {
    userOption.configs.map((config) => {
      if (config.moduleName === argModule) {
        targetModulesConfigs.push(config);
      }
    });
  });
  return targetModulesConfigs;
};

export default getTargetModuleConfig;
