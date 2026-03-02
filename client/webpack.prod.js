// webpack.prod.js
const webpackCommon = require('./webpack.common');
const webpack = require('webpack');

module.exports = {
  ...webpackCommon,
  mode: "production",
  plugins: [
    ...webpackCommon.plugins,
    new webpack.DefinePlugin({
      'process.env.APP_MODE': JSON.stringify('production')
    })
  ]
};