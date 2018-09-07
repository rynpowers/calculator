const webpackConfig = require('./webpack.config')();
webpackConfig.mode = 'development';
webpackConfig.output = {};

module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    client: {
      jasmine: { random: false },
    },
    files: ['src/**/*spec.js'],
    preprocessors: { 'src/**/*spec.js': ['webpack'] },
    webpack: webpackConfig,
    reporters: ['kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
  });
};
