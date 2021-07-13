const path = require('path');
module.exports = {
  entry: {
    app: "./layout/src/index.js",
    critical: "./layout/src/critical-scripts.js",
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './layout/dist/')
  },
  mode: 'development',
  devServer: {
    open: true,
    port: 3000,
    liveReload: true,
    writeToDisk: true,
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      },
      exclude: /node_modules/,
    }]
  }
}