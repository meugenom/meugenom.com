// webpack.dev.js
const webpackCommon = require('./webpack.common');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  ...webpackCommon,
  devtool: "inline-source-map",
  mode: "development",
  plugins: [
    ...webpackCommon.plugins,
    new webpack.DefinePlugin({
      'process.env.APP_MODE': JSON.stringify('development')
    })
  ],
  devServer: {
    static: path.join(__dirname, './build'),
    port: 8082,
    open: true,
    historyApiFallback: true, 
    hot: true,
  }
};