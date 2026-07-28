// webpack.prod.js
const webpackCommon = require('./webpack.common');
const webpack = require('webpack');

module.exports = {
  ...webpackCommon,
  mode: "production",
};