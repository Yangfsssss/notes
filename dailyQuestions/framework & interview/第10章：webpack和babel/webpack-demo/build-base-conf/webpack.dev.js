const webpack = require('webpack');
const path = require('path');

const { srcPath, distPath } = require('./paths');

const { merge } = require('webpack-merge');

console.log('join',path.join(srcPath,'index.js'));
console.log('join',__dirname);

const webpackCommonConf = require('./webpack.common.js');

module.exports = merge(webpackCommonConf, {
  mode:'development',
  module:{
    rules:[
      {
        // 直接引入图片 url
        test:/\.(png|jpg|gif)$/,
        use:'file-loader',
      },
    ],
  },
  plugins:[
    new webpack.DefinePlugin({
      // window.ENV = 'development';
      'ENV': JSON.stringify('development'),
    })
  ],
  devServer:{
    port:8080,
    // 显示打包的进度条
    // progress:true, 
    // 根目录
    // contentBase:distPath, 
    // 自动打开浏览器
    open:true, 
    // 启动gzip压缩
    compress:true, 

    // 设置代理
    proxy:{
      '/api':'http://localhost:3000',
      '/api2':{
        target:'http://localhost:3000',
        changeOrigin:true,
        pathRewrite:{
          '^/api2':'',
        }
      }
    }
  }
})