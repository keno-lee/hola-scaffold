module.exports = async (configs) => {
  const Webpack = require('webpack');

  return new Promise((resolve, reject) => {
    let compiler = Webpack(configs);

    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      if (stats.hasErrors()) {
        console.log('编译报错');
        // console.log(stats);
      }

      resolve(stats);
    });
  });
};
