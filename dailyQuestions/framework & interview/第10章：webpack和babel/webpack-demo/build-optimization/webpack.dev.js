const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');

const webpackCommonConf = require('./webpack.common.js');
const { srcPath } = require('./paths');


module.exports = merge(webpackCommonConf, {
  mode: 'development',
  entry: {
    // index: path.join(srcPath, 'index.ts'),
    index :[
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server',
      path.join(srcPath, 'index.ts'),
    ],
    other: path.join(srcPath, 'other.ts'),
  },
  module: {
    rules: [
      {
        test: /\.(js)|(jsx)$|(ts)$|(tsx)$/,
        include: srcPath,
        exclude: /(node_modules)|(bower_components)/,
        use: ['babel-loader?cacheDirectory=true'],
        // options: {
        //   presets: ['@babel/react', '@babel/typescript', '@babel/preset-env'],
        //   plugins: [['@babel/plugin-proposal-decorators', { legacy: true }], '@babel/plugin-proposal-class-properties'],
        // },
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
    
    // // 第三，告诉 Webpack 使用了哪些动态链接库
    // new webpack.DllReferencePlugin({
    //   // 描述 react 动态链接库的文件内容
    //   manifest: path.join(srcPath, 'dist', 'react.manifest.json'),
    // }),

  ],
  devServer: {
    port: 8080,
    // 显示打包的进度条
    // progress:true,
    // 根目录
    // contentBase:distPath,
    // 自动打开浏览器
    open: true,
    // 启动gzip压缩
    compress: true,

    // 启动热更新
    hot: true,

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
