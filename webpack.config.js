const config = require('./config');

module.exports = {
  devtool: 'source-map',
  entry: {
    'js/main.js': ['@babel/polyfill', './src/js/main.js'],
    '__discard__/css/main.css.js': './src/sass/main.scss',
    '__discard__/css/svg.css.js': './src/sass/svg.scss',
  },
  output: {
    path: config.buildRoot,
    filename: '[name]',
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.peg$/,
        loader: require.resolve('./lib/canopy-loader'),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'file-loader?name=css/[name].css',
          'extract-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
