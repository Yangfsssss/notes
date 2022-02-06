/** @type {import('webpack').Configuration} */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const SourceMapDevToolPlugin = require("source-map");

const includePath = [
  path.resolve(__dirname, './src'),
  // path.resolve(__dirname,'package.json')
];

console.log('`${includePath[0]}/index.html`', `${includePath[0]}/index.html`);

const config = {
  entry: './src/index.tsx',
  mode: 'none',
  module: {
    rules: [
      // {
      // test: /\.tsx?$/,
      // use: "ts-loader",
      // exclude: "/node_modules/",
      // include:includePath
      // resource:includePath[0]
      // },
      {
        test: /\.(js)|(jsx)$|(ts)$|(tsx)$/,
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
        // include:includePath
        // resource:includePath[0]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    // contentBase: path.join(__dirname, "dist/"),
    port: 3006,
    // publicPath: "http://localhost:3005/dist/",
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['bundle.js'],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};

// const config = {
// mode: 'none',
// entry: './src/main.js',
// entry: './src/index.js',
// output: { filename: "bundle.js" },
// plugins: [
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//         title: 'Webpack Plugin Sample',
//         template: './src/index.html'
//     }),
// new HtmlWebpackPlugin({
//     filename:'about.html'
// })
// new CopyWebpackPlugin({
//     patterns: ['public']
// }),
// new RemoveCommentsPlugin()
// ],
// module: {
//     rules: [
//         {
//             test: /\.md$/,
//             use: ['html-loader', './markdown-loader']
//         }
//     ]
// }
// }

module.exports = config;
