var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');

function fail(msg) {
    throw new Error(msg);
}

module.exports = {
    entry: 'app.js',
    resolve: {
        root: [
            path.join(__dirname, 'lib'),
            path.join(__dirname, 'styles')
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'poll.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader?optional=runtime"},
            {test: /\.css$/, loader: "style-loader!css-loader?modules!postcss-loader"},
            {test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")},
            {test: /\.(woff|eot|ttf|png|svg)$/, loader: "file-loader"}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Poll',
            template: 'index.html',
            inject: 'body',
            minify: {},
            hash: true
        }),
        new DefinePlugin({
            SPLUNK_HOST: JSON.stringify(process.env.PP_SPLUNK_HOST || 'localhost'),
            SPLUNK_PORT: JSON.stringify(parseInt(process.env.PP_SPLUNK_PORT || 8088, 10)),
            SPLUNK_SSL: JSON.stringify(process.env.PP_SPLUNK_SSL == 'true' || false),
            SPLUNK_TOKEN: JSON.stringify(process.env.PP_SPLUNK_TOKEN || fail('Environment variable PP_SPLUNK_TOKEN is required.')),
            DEBUG: JSON.stringify(process.env.PP_DEBUG == 'true' || false)
        })
    ],
    postcss: function() {
        return [require('autoprefixer'), require('precss')];
    }
};
