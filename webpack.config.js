const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const openBrowser = require('react-dev-utils/openBrowser');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let developmentConfigs = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'app'),
    port: 9999,
    after: () => { openBrowser("http://localhost:9999"); }
  },
  module: {
    rules: [
      {
        test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '../fonts/fontawesome/webfonts/' // where the fonts will go
          }
        }]
      },
    ]
  }
});

module.exports = developmentConfigs;