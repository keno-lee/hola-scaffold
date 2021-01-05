// 这个文件是暴露给hola-cli服务用的，自己的模块用不到
const Service = require('./src/Service');

exports.serve = (args) => {
  new Service(process.cwd()).run('serve', args);
};

exports.build = (args) => {
  new Service(process.cwd()).run('build', args);
};
