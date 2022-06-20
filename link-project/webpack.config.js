const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // eslint-disable-next-line n/no-path-concat
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};
