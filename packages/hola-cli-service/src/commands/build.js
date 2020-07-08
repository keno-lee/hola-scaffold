module.exports = async (configs) => {
  const Webpack = require('webpack');
  const chalk = require('chalk');
  const fs = require('fs');
  const path = require('path');

  return new Promise((resolve, reject) => {
    let compiler = Webpack(configs);

    compiler.run((err, stats) => {
      // console.log('stats', stats.toJson());

      // fs.writeFile(path.join(process.cwd(), 'xxx.js'), JSON.stringify(stats), function(err, data) {
      //   if (err) {
      //       throw err;
      //   }
      //   console.log(data);
      // })

      if (err) {
        return reject(err);
      }

      if (stats.hasErrors()) {
        console.log('111', stats);
      }
    });
  });
};
