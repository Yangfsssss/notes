const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.join(__dirname, 'src');

const config = {
  entry: path.join(srcPath, 'index.tsx'),
  resolve: {
    // extensions: ['.js','.jsx','.ts','.tsx'],
    alias: {
      // pages:path.join(__dirname,'./src/pages')
      pages: path.join(__dirname, './State Manage in React/code/src/pages'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
};

module.exports = config;
