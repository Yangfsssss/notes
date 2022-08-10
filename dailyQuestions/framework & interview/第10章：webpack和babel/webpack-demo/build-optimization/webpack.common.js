const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { srcPath } = require('./paths');

const config = {
  // 正常使用 framework & interview 需改为 framework_interview
  entry: {
    index: path.join(srcPath, 'index.ts'),
    other: path.join(srcPath, 'other.ts'),
  },
  module: {
    // rules: [],
  },
  plugins: [
    // 多入口 - 生成 index.html
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other）
      chunks: ['index', 'vendor', 'common'], // 要考虑代码分割
    }),
    // 多入口 - 生成 other.html
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'other.html'),
      filename: 'other.html',
      chunks: ['other', 'common'], // 要考虑代码分割
      // excludeChunks: ['vendor'], // 不引用 index
    }),
  ],
};

module.exports = config;
