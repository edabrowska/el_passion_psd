module.exports = {
  module: {
    rules: [
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
      {
        test: /\.css$/,
        use: [
          'css-loader'
        ]
      }
    ]
  }
}
