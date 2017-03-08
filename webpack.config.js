var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// an array with strings- names of the libraries which we want to include in
// this separate vendor file.
const VENDOR_LIBS = [
  'react', 'lodash', 'redux', 'react-redux', 'react-dom', 'react-input-range',
  'redux-form', 'redux-thunk', 'faker'
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    //[name] will be replaced with the entry bundle file name
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
