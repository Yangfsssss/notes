const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const webpackCommonConf = require('./webpack.common.js');
const srcPath = path.join(__dirname, 'src');

module.exports = merge(webpackCommonConf, {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://localhost:3006/',
    'webpack/hot/dev-server',
    path.join(srcPath, 'index.tsx'),
  ],
  module: {
    rules: [
      {
        test: /\.(js)|(jsx)$|(ts)$|(tsx)$/,
        // include: srcPath,
        exclude: /(node_modules)|(bower_components)/,
        // exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory=true'],
        // use: ['babel-loader'],
      },
      {
        // 直接引入图片 url
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader',
      },
      {
        test: /\.css$/,
        // loader 的执行顺序是：从后往前
        use: ['style-loader', 'css-loader', 'postcss-loader'], // 加了 postcss
      },
      {
        test: /\.less$/,
        // 增加 'less-loader' ，注意顺序
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      // window.ENV = 'development';
      ENV: JSON.stringify('development'),
    }),

    new webpack.HotModuleReplacementPlugin(),

    // 第三，告诉 Webpack 使用了哪些动态链接库
    new webpack.DllReferencePlugin({
      // 描述 react 动态链接库的文件内容
      manifest: require(path.join(__dirname, 'dll_dist', 'react.manifest.json')),
    }),

    // 将 dll 注入到 生成的 html 模板中
    new AddAssetHtmlPlugin({
      // dll文件位置
      filepath: path.join(__dirname, 'dll_dist', 'react.dll.js'),
      // dll 引用路径
      publicPath: './dll_dist',
      // dll最终输出的目录
      outputPath: './dll_dist',
    }),
  ],
  devServer: {
    port: 3006,
    // 显示打包的进度条
    // progress:true,
    // 根目录
    // contentBase:distPath,
    // 自动打开浏览器
    open: true,
    // 启动gzip压缩
    compress: true,
    historyApiFallback: true,

    // 启动热更新
    // hot: true,

    // 设置代理
    proxy: {
      '/api': 'http://localhost:3000',
      '/api2': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api2': '',
        },
      },
    },
  },
});
