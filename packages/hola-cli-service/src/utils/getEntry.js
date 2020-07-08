/**
 * @param {Object} allModule
 * @param {Array} targetModuleName
 * @returns {Object} targetEntry {app: '', web: ''}
 */
const getEntry = (allModule, targetModuleName) => {
  if (!allModule) {
    console.warn(`请检查'hola.config.js'中的entry参数`);
  }
  let targetEntry;
  if (targetModuleName.length.length > 0) {
    for (let k in allModule) {
      if (targetModuleName.includes(k)) {
        targetEntry[k] = allModule[k];
      }
    }
  } else {
    targetEntry = allModule;
  }

  return targetEntry;
};

module.exports = getEntry;
