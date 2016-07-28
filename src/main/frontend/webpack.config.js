/**
 * Created by kozervar on 2016-07-24.
 */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        client: "./src/client/app.js",
        server: "./src/server/app.js"
    },
    output: {
        path: '../resources/static/',
        filename: "bundle.[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "./src")
                ],
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("isomorphic-style-loader", "css-loader!less-loader")
            }
            //{
            //    test: /\.less$/,
            //    loaders: [
            //        'isomorphic-style-loader',
            //        'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]',
            //        'postcss-loader'
            //    ]
            //}
            //{
            //    test: /\.css$/,
            //    loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            //},
            //{
            //    test: /\.less$/,
            //    loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            //}
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ]
};
