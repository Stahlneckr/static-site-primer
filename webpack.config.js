var HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const ReloadPlugin = require('reload-html-webpack-plugin');

var config = {
  entry: './src/js/main.js',
  output: {
    path: __dirname + '/build',
    publicPath: '',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true, // autorefresh
    historyApiFallback: {
      index: '/'  // serve index for 404 (react-router)
    },
    port: 3000 // development port server
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'font-loader' },
          { loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('postcss-import')(),
                require('postcss-comment/hookRequire')(),
                require('postcss-simple-vars')(),
                require('postcss-nested')(),
                require('postcss-custom-media')(),
                require('autoprefixer')({ remove: false })
              ]
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|mp4|webm|ico|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    ]
  },
  plugins: [
    // Adds %PUBLIC_URL% to html template
    new InterpolateHtmlPlugin({
      'PUBLIC_URL': 'public'
    }),
    // Generates HTML based on template
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: 'head',
      favicon: './src/assets/favicon.ico',
    }),
    new HtmlWebpackPlugin({
      filename: 'example.html',
      template: './src/example.html',
      inject: 'head',
      favicon: './src/assets/favicon.ico',
    }),
    new HtmlWebpackInlineSVGPlugin(),
    // REMOVE THIS
    new ReloadPlugin()
  ]
}
module.exports = config;
