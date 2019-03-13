const path = require('path');

module.exports = {
  entry: './src/content-fetch.js',
  target: 'web',
  output: {
    filename: 'agility-content-fetch.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'aglFetch',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  module: {
    rules : [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ]
  },
  // Plugins
  plugins: []
};