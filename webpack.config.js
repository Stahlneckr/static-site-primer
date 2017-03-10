module.exports = {
  entry: './src/js/main.js',
  output: {
    path: __dirname + '/build',
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(ttf|woff|woff2)$/,
        loader: 'url-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader?importLoaders=1' },
          { loader: 'font-loader' },
          { loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('postcss-cssnext')
                ];
              }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  }
}