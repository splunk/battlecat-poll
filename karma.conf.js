process.env.PP_SPLUNK_TOKEN = 'yolo';
var webpackConfig = require('./webpack.config.js');

delete webpackConfig.entry;
delete webpackConfig.plugins;
delete webpackConfig.output;

console.log(JSON.stringify(webpackConfig), null, 2);

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'sinon'],


        // list of files / patterns to load in the browser
        files: [
            'lib/**/*.spec.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            // add webpack as preprocessor
            '**/*.spec.js': ['webpack']
            //'test/**/*.spec.js': ['webpack']
        },

        plugins: [
            require("karma-mocha"),
            require("karma-sinon"),
            require("karma-spec-reporter"),
            require("karma-chrome-launcher"),
            require("karma-webpack")
        ],
        
        webpack: webpackConfig,
        webpackMiddleware: { noInfo: true },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec'],

        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
