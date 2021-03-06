const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')


const VueClientPlugin = require('vue-server-renderer/client-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


const baseConfig = require('./wp.base')
const isDev = process.env.NODE_ENV === 'development'

module.exports = merge(baseConfig, {
  entry: {
    app: './client/client-entry.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
    publicPath: isDev ? 'http://localhost:2333/' : 'https://cdn.clicli.us/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: true
        }
      },
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  },
  plugins: [
    new VueClientPlugin(),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    compress: true,
    port: 2333
  }
})
