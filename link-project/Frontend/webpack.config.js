import HtmlWebpackPlugin from 'html-webpack-plugin';

export const mode = 'development';
export const module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
  ],
};
export const plugins = [
  new HtmlWebpackPlugin({
    // eslint-disable-next-line n/no-path-concat
    template: __dirname + '/src/index.html',
    filename: 'index.html',
    inject: 'body',
  }),
];
