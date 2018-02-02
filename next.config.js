const webpack = require('webpack')
const path = require('path')
const glob = require('glob')

let BundleAnalyzerPlugin
const { ANALYZE } = process.env
if (ANALYZE) {
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
}

const { createHashFile } = require('./scripts/helpers.js')
createHashFile()

module.exports = {
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
    }
  },
  webpack: function (config) {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }))
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.STATIC_EXPORT': !!process.env.STATIC_EXPORT,
      })
    )

    config.module.rules.push(
      {
        test: /\.(css|sass)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      },
      {
        test: /\.sass$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          { loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    )

    return config
  }
}
