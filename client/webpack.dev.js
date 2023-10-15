// webpack.dev.js
const webpackCommon = require('./webpack.common');
const path = require('path');

module.exports = {
  ...webpackCommon,
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    static: path.join(__dirname, './dist'),
    port: 8081,
    open: true,
    historyApiFallback: true, 
    hot: true,
  }
};