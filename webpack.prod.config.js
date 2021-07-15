const path = require('path');
module.exports = {
  entry: {
    app: "./layout/src/index.js",
    critical: "./layout/src/critical-scripts.js",
    admin: "./layout/src/admin.js",
    auth: "./layout/src/auth.js",
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './layout/app')
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