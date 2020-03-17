// import path from 'path'
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')


const commonConfig = {
  entry: path.resolve(__dirname, './index.tsx'),
  output: {
    publicPath: '/',
    filename: '[name]-[hash].bundle.js',
  },
  resolve: {
    // 我们导入ts 等模块一般不写后缀名，webpack 会尝试使用这个数组提供的后缀名去导入
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        // 开启缓存
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },

  plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ filename: 'index.html', template: path.resolve(__dirname, './index.html') })
  ],
};

module.exports = commonConfig
