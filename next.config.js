/* eslint-disable no-console */

const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
const mv = require('mv')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let BundleAnalyzerPlugin
const { ANALYZE } = process.env
if (ANALYZE) {
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
}

const { createHashFile } = require('./scripts/helpers.js')
createHashFile()
const { GLOBAL_CSS_FILENAME } = require('./scripts/consts.js')

function OnDonePlugin () {}
OnDonePlugin.prototype.apply = (compiler) => {
  compiler.plugin('done', () => {
    // next.js does not provide an after-build callback, and makes the path passed to ExtractTextPlugin
    // relative to .next dir, so here we wait 1s for the build to be output to .next dir and mv it
    setTimeout(() => {
      mv(`.next/${GLOBAL_CSS_FILENAME}`, `static/${GLOBAL_CSS_FILENAME}`, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log(`\nmoved ${GLOBAL_CSS_FILENAME} to static\n`)
        }
      })
    }, 1000)
  })
}

const emitLoaderConfig = {
  loader: 'emit-file-loader',
  options: {
    name: 'dist/[path][name].[ext]'
  }
}

module.exports = {
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
    }
  },
  webpack: function (config, {dev}) {
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
      }),
    )

    if (!dev) {
      config.plugins.push(
        new OnDonePlugin(),
        new ExtractTextPlugin(GLOBAL_CSS_FILENAME),
      )
    }

    config.module.rules.push(
      {
        test: /\.(css|sass)/,
        ...dev ?
          emitLoaderConfig
          :
          {use: ExtractTextPlugin.extract({use: emitLoaderConfig})}
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
      },
      {
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      },
    )

    return config
  }
}
