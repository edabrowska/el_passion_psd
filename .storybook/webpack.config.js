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
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)/,
        loader: 'file-loader'
      },
    ]
  }
}
