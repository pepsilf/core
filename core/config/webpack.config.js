const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    libraryTarget: "umd",
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}
    ]
  },
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     comments: false,
  //     compress: {
  //       warnings: false
  //     }
  //   })
  // ]
};
