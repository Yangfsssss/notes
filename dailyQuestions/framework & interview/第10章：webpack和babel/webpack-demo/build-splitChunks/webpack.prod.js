const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const webpackCommonConf = require('./webpack.common.js');
const { distPath } = require('./paths');

module.exports = merge(webpackCommonConf, {
  mode: 'production',
  output: {
    // 哈希值不变，可以命中缓存
    // filename: 'bundle.[contenthash:8].js',
    // 多入口时 entry 的
    filename: '[name].[contenthash:8].js',
    // filename: '[name].js',
    path: distPath,
  },
  module: {
    rules: [
      {
        // 图片 - 考虑 base64 编码的情况
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 小于 5kb 的图片用 base64 格式产出
            // 否则，依然沿用 file-loader 的形式，产出url
            limit: 5 * 1024,

            // 打包到 img 目录下
            outputPath: '/img1/',

            // 设置图片的 cdn 地址（也可统一在外面的output）
            // publicPath: 'http://cdn.abc.com/',
          },
        },
      },
      {
        // 抽离CSS
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader', // 注意：这里不再使用 style-loader
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        // 抽离LESS
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          //  'style-loader', // 注意：这里不再使用 style-loader
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    // 每次打包前清理 output.path 目录
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      // window.ENV = 'production';
      ENV: JSON.stringify('production'),
    }),

    // 抽离 CSS 文件
    new MiniCssExtractPlugin({
      filename: 'css/main.[contenthash:8].css',
    }),
  ],
  optimization: {
    // 压缩CSS
    minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin({})],

    // 分割代码块
    splitChunks: {
      chunks: 'all',
      /**
       * initial 入口 chunk，对于异步导入的文件不处理
       *   async 异步 chunk，只对异步导入的文件处理
       *   all 全部 chunk
       */

      // 缓存分组
      cacheGroups: {
        // 第三方模块
        vender: {
          name: 'vendor', // chunk 名称
          priority: 1, // 权重更高，优先抽离，重要！！
          test: /[\\/]node_modules[\\/]/, // 位置
          minSize: 0, // 大小限制
          minChunks: 1, // 最少复用过几次
        },

        // 公共模块
        common: {
          name: 'common',
          priority: 0,
          minSize: 0,
          minChunks: 2,
        },
      },
    },
  },
});
