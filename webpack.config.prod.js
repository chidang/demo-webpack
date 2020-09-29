const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let productionConfigs = merge(baseConfig, {
  mode: 'production',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '../fonts/fontawesome/webfonts/', // where the fonts will be accessed
            outputPath: '/assets/fonts/fontawesome/webfonts/',// where the fonts will be saved
          }
        }]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './app/assets/images', to: 'assets/images' },
      ],
    })
  ]
});

module.exports = productionConfigs;
