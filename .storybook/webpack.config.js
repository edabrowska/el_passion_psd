const path = require('path')
const glob = require('glob')

module.exports = {
  module: {
    rules: [
      {
        test: /\.s(c|a)ss$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'sass-loader', // compiles Sass to CSS
          options: {
            includePaths: ['../node_modules', '../styles']
              .map((d) => path.join(__dirname, d))
              .map((g) => glob.sync(g))
              .reduce((a, c) => a.concat(c), [])
          }
        }]
      },
    ]
  }
}
