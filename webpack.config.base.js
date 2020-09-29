const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PagesConfig = require('./configs/pages_config.js');

const pageConfigs = PagesConfig.page_options.map(
  page_option => new HtmlWebpackPlugin({
    title: page_option.title,
    template: path.resolve(__dirname, page_option.template),
    filename: page_option.filename,
    inject: false,
    minify: false,
    chunks: ['core_js', 'core_css'].concat(page_option.chunks),
    scriptLoading: 'defer'
  })
);

let baseConfigs = {
  mode: 'development',
  entry: PagesConfig.entries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/[name].[hash].js',
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-proposal-class-properties"
          ]
        }
      },
      {
        test: /\.(scss|sass|css)$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader, // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
          options: {
            sourceMap: true,
          }
        }, {
          loader: 'postcss-loader', // Run postcss actions
          options: {
            plugins: function() { // postcss plugins, can be exported to postcss.config.js
              return [
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader', // compiles Sass to CSS
          options: {
            sourceMap: true,
          }
        }]
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        query: {
          helperDirs: [
            __dirname + "/helpers",
          ]
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
          }
        }]
      },
    ]
  },
  plugins: [
    ...pageConfigs,
    new CleanWebpackPlugin(),
    new webpack.LoaderOptionsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
      chunkFilename: '[id].css',
      minify: false
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    // new webpack.ProvidePlugin({
    //   bootstrap: "bootstrap"
    // })
  ],
  optimization: {
    minimize: true
  }
};

module.exports = baseConfigs;