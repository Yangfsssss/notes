const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { srcPath, distPath } = require('./paths');

const config = {
  // 正常使用 framework & interview 需改为 framework_interview
  entry: {
    index: path.join(srcPath, 'index.ts'),
    other: path.join(srcPath, 'other.ts'),
  },
  module: {
    rules: [
      // {
      //   test:/\.js$/,
      //   loader:['babel-loader'],
      //   include:srcPath,
      //   exclude:/node_modules/,
      // },
      {
        test: /\.(js)|(jsx)$|(ts)$|(tsx)$/,
        include: srcPath,
        exclude: /(node_modules)|(bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/react', '@babel/typescript', '@babel/preset-env'],
          plugins: [['@babel/plugin-proposal-decorators', { legacy: true }], '@babel/plugin-proposal-class-properties'],
        },
        // include:includePath,
        // resource:includePath[0]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      // {
      //   test: /\.(less|css)$/i,
      //   use: [
      //     // isDEV ? 'style-loader' : MiniCssExtractPlugin.loader,
      //     // Creates `style` nodes from JS strings
      //     // 'style-loader',
      //     // Translates CSS into CommonJS
      //     'css-loader',
      //     {
      //       loader: 'less-loader',
      //       options: {
      //         lessOptions: {
      //           javascriptEnabled: true
      //         }
      //       }
      //     },
      //   ],
      // },
    ],
  },
  // resolve: {
  //   extensions: ['.js', '.json', '.wasm'],
  // },
  plugins: [
    // 多入口 - 生成 index.html
    new HtmlWebpackPlugin({
      // template: path.join(__dirname, 'index.html'),
      template: './dailyQuestions/framework_interview/第10章：webpack和babel/webpack-demo/src/index.html',
      // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other）
      chunks: ['index'],
      filename: 'index.html',
    }),
    // 多入口 - 生成 other.html
    new HtmlWebpackPlugin({
      // template: path.join(__dirname, 'other.html'),
      template: './dailyQuestions/framework_interview/第10章：webpack和babel/webpack-demo/src/other.html',
      chunks: ['other'],
      filename: 'other.html',
    }),
  ],
};

module.exports = config;
