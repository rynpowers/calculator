const { resolve } = require('path');

module.exports = config => {
  return {
    context: resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
      filename: 'bundle.js',
      path: resolve(__dirname, 'build'),
      publicPath: '/build/',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loaders: ['babel-loader'],
          exclude: /node_modules/,
        },
      ],
    },
  };
};
