/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withSass = require('@zeit/next-sass')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const dotenv = require('dotenv')

const applicationEnv = process.env.APPLICATION_ENV || 'development'

dotenv.load({ path: path.resolve(process.cwd(), '.env') })
const envConfig = dotenv.parse(fs.readFileSync(`config/${applicationEnv}.env`))

const exportsMap = require('./exports-map.js')

const analizeConfig = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: './bundles/client.html'
    }
  }
}

const nextConfig = {
  ...analizeConfig,
  exportPathMap: () => exportsMap,
  webpack: (config) => {
    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        filename: 'static/service-worker.js',
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/
          }
        ]
      })
    )

    config.module.rules.push(
      {
        test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '../../../static/',
              emitFile: false,
              name: '[name].[ext]?[sha512:hash:base64:7]',
            }
          }
        ]
      },
      {
        test: /\.ya?ml$/,
        loader: ['bundle-loader', 'json-loader', 'yaml-loader'],
      },
    )

    return config
  },
  serverRuntimeConfig: { // Will only be available on the server side
    mySecret: process.env.SOME_SECRET_KEY
  },
  publicRuntimeConfig: envConfig, // Will be available on both server and client
}

module.exports = withSass(withBundleAnalyzer(nextConfig))
