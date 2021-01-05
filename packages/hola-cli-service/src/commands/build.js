module.exports = async configs => {
  const Webpack = require('webpack')
  const chalk = require('chalk')
  const fs = require('fs')
  const path = require('path')

  return new Promise((resolve, reject) => {
    let compiler = Webpack(configs)

    compiler.run((err, stats) => {
      if (err) {
        return reject(err)
      }
      if (stats.hasErrors()) {
        console.log('编译报错', stats)
      }

      resolve(stats)
    })
  })
}
