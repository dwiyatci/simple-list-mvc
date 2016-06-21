/**
 * Created by glenn on 13/06/16.
 */

const join              = require('path').join;
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool  : 'cheap-module-source-map',
  resolve  : {
    root      : [
      join(__dirname, 'src'),
    ],
    extensions: ['', '.js', '.css', '.html'],
  },
  entry    : {
    vendor: [
      'lodash',
      'jquery',
    ],
    app   : [
      'babel-polyfill',
      './src/main.js',
    ],
  },
  output   : {
    path    : join(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins  : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),

    new ExtractTextPlugin('[name].css'),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
  module   : {
    loaders: [
      {
        test   : /\.js$/,
        include: [
          join(__dirname, 'src'),
        ],
        loader : 'babel',
        query  : {
          presets: ['es2015', 'stage-2'],
        },
      },
      {
        test  : /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
      },
      {
        test  : /\.html$/,
        loader: 'html',
      },
    ],
  },
  devServer: {
    contentBase       : 'dist',
    noInfo            : true,
    historyApiFallback: true,
  },
};
