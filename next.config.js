/* eslint-disable no-console */

const fs = require('fs')
const withSass = require('@zeit/next-sass')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')

const applicationEnv = process.env.APPLICATION_ENV || 'development'
const envConfig = dotenv.parse(fs.readFileSync(`config/${applicationEnv}.env`))

const exportsMap = require('./exports-map.js')

let BundleAnalyzerPlugin
const { ANALYZE } = process.env
if (ANALYZE) {
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
}

const nextConfig = {
  exportPathMap: () => exportsMap,
  webpack: (config) => {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }))
    }

    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/
          }
        ]
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(envConfig)
      })
    )

    config.module.rules.push(
      {
        test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '../../',
              name: '[path][name].[ext]?[sha512:hash:base64:7]',
              emitFile: false
            }
          }
        ]
      },
      {
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      },
    )

    return config
  }
}

module.exports = withSass(nextConfig)
