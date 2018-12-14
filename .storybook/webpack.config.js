const dotenv = require('dotenv')
const fs = require('fs')
const webpack = require('webpack')
const applicationEnv = process.env.APPLICATION_ENV || 'development'
const envConfig = dotenv.parse(fs.readFileSync(`config/${applicationEnv}.env`))


module.exports = {
  module: {
    rules: [
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader?sourceMap', // translates CSS into CommonJS
          'sass-loader?sourceMap',
        ]
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        loader: 'file-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)/,
        loader: 'file-loader'
      },
      {
        test: /\.ya?ml$/,
        loader: ['bundle-loader', 'json-loader', 'yaml-loader'],
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        ...envConfig,
        NODE_ENV: process.env.NODE_ENV
      })
    })
  ]
}
