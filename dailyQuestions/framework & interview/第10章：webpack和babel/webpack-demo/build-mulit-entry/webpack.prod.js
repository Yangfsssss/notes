const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

const webpackCommonConf = require('./webpack.common.js');
const { srcPath, distPath } = require('./paths');

module.exports = merge(webpackCommonConf, {
  mode: 'production',
  output: {
    // 哈希值不变，可以命中缓存
    // filename: 'bundle.[contenthash:8].js',
    // 多入口时 entry 的
    filename: '[name].[contenthash:8].js',
    path: distPath,
  },
  module: {
    rules: [
      {
        // 图片 - 考虑 base64 编码的情况
        test: /\.(png|jpg|gif)$/,
        use: {
          loader:'url-loader',
          options: {
            // 小于 5kb 的图片用 base64 格式产出
            // 否则，依然沿用 file-loader 的形式，产出url
            limit: 5 * 1024,

            // 打包到 img 目录下
            outputPath:'/img1/',

            // 设置图片的 cdn 地址（也可统一在外面的output）
            // publicPath: 'http://cdn.abc.com/',
          },
        },
      },
    ],
  },
  plugins: [
    // 每次打包前清理dist目录
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      // window.ENV = 'production';
      'ENV': JSON.stringify('production'),
    }),
  ]
});
