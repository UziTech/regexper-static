process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(karma) {
  karma.set({
    frameworks: ['jasmine'],
    files: ['spec/test_index.js'],
    preprocessors: {
      'spec/test_index.js': ['webpack', 'sourcemap'],
    },
    reporters: ['progress'],
    colors: true,
    logLevel: karma.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: true,
    singleRun: false,
    webpack: {
      devtool: 'inline-source-map',
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
        ],
      },
    },
  });
};
