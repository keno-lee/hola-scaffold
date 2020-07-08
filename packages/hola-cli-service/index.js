const Service = require('./src/Service');

exports.serve = async (args) => {
  new Service(process.cwd()).run('serve', args);
};

exports.build = (args, outputDir) => {
  new Service(process.cwd()).run('build', args, outputDir);
};
