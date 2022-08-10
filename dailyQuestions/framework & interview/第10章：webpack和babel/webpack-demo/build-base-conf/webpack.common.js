const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { srcPath, distPath } = require('./paths');

const config = {
  // entry: './dailyQuestions/framework_interview/第10章：webpack和babel/webpack-demo/src/index.ts',
  entry: path.join(srcPath,'index.ts'),
  module:{
    rules:[
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
          plugins: [
            ['@babel/plugin-proposal-decorators',
            { "legacy": true },],
            '@babel/plugin-proposal-class-properties',
          ],
        },
        // include:includePath,
        // resource:includePath[0]
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader','postcss-loader'],
      },
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader'],
      }
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
  plugins:[
    new HtmlWebpackPlugin({
      // template:path.join(__dirname,'index.html'),
      template: path.join(srcPath,'index.html'),
      filename:'index.html',
    }),
  ]
}

module.exports = config;