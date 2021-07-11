const path = require('path');
module.exports = {
  entry: {
    app: "./src/index.js",
    critical: "./src/critical-scripts.js",
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './app')
  },
  mode: 'production',
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