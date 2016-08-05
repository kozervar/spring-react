import path from 'path';
import webpack from 'webpack';
import extend from 'extend';
//import AssetsPlugin from 'assets-webpack-plugin';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');

const GLOBALS = {
    'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
    __DEV__: DEBUG,
};

/**
 * Common configuration
 */
const config = {
    context: path.resolve(__dirname, '../src'),
    output: {
        path: path.resolve(__dirname, '../resources/webpack/assets'),
        publicPath: '/assets/',
        sourcePrefix: '  '
    },

    module : {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [
                    //path.resolve(__dirname, '../node_modules/react-routing/src'),
                    path.resolve(__dirname, '../src'),
                ],
                query: {
                    // https://github.com/babel/babel-loader#options
                    cacheDirectory: DEBUG,

                    // https://babeljs.io/docs/usage/options/
                    babelrc: false,
                    presets: [
                        'react',
                        'es2015',
                        'stage-0',
                    ],
                    plugins: [
                        'transform-runtime',
                        //...DEBUG ? [] : [
                        //    'transform-react-remove-prop-types',
                        //    'transform-react-constant-elements',
                        //    'transform-react-inline-elements',
                        //],
                    ],
                },
            },
            {
                test: /\.scss$/,
                loaders: [
                    'isomorphic-style-loader',
                    `css-loader?${JSON.stringify({ sourceMap: DEBUG, minimize: !DEBUG })}`,
                    'postcss-loader?pack=sass',
                    'sass-loader',
                ],
            },
        ]
    },
    resolve: {
        root: path.resolve(__dirname, '../'),
        modulesDirectories: ['node_modules'],
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
    },
    cache: DEBUG,
    debug: DEBUG,
    stats: {
        colors: true,
        reasons: DEBUG,
        hash: VERBOSE,
        version: VERBOSE,
        timings: true,
        chunks: VERBOSE,
        chunkModules: VERBOSE,
        cached: VERBOSE,
        cachedAssets: VERBOSE,
    },
    postcss(bundler) {
        return {
            default: [],
            sass: []
        };
    }
};

const clientConfig = extend(true, {}, config, {
    entry: {
        client: './client/client.js'
    },

    output: {
        path: '../resources/webpack/',
        filename: DEBUG ? '[name].js?[chunkhash]' : '[name].[chunkhash].js',
        chunkFilename: DEBUG ? '[name].[id].js?[chunkhash]' : '[name].[id].[chunkhash].js',
    },

    target: 'web',

    plugins: [
        new webpack.DefinePlugin({ ...GLOBALS, 'process.env.BROWSER': true }),

        // Emit a file with assets paths
        // https://github.com/sporto/assets-webpack-plugin#options
        //new AssetsPlugin({
        //    path: path.resolve(__dirname, '../resources/webpack/'),
        //    filename: 'assets.js',
        //    processOutput: x => `module.exports = ${JSON.stringify(x)};`,
        //}),
        //
        //// Assign the module and chunk ids by occurrence count
        //// Consistent ordering of modules required if using any hashing ([hash] or [chunkhash])
        //// https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
        //new webpack.optimize.OccurrenceOrderPlugin(true),
        //
        //...DEBUG ? [] : [
        //
        //    // Search for equal or similar files and deduplicate them in the output
        //    // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
        //    new webpack.optimize.DedupePlugin(),
        //
        //    // Minimize all JavaScript output of chunks
        //    // https://github.com/mishoo/UglifyJS2#compressor-options
        //    new webpack.optimize.UglifyJsPlugin({
        //        compress: {
        //            screw_ie8: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        //            warnings: VERBOSE,
        //        },
        //    }),
        //
        //    // A plugin for a more aggressive chunk merging strategy
        //    // https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
        //    new webpack.optimize.AggressiveMergingPlugin(),
        //]
    ],

    // Choose a developer tool to enhance debugging
    // http://webpack.github.io/docs/configuration.html#devtool
    devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
});

/**
 * Server config
 */
const serverConfig = extend(true, {}, config, {
    entry: './server/server.js',

    output: {
        path: '../resources/webpack/server/',
        filename: 'server.js',
        chunkFilename: 'server.[name].js',
        libraryTarget: 'var',
    },

    target: 'web',

    //externals: [
    //    /^\.\/assets$/,
    //    function filter(context, request, cb) {
    //        const isExternal =
    //            request.match(/^[@a-z][a-z\/\.\-0-9]*$/i) &&
    //            !request.match(/^react-routing/) &&
    //            !context.match(/[\\/]react-routing/);
    //        cb(null, Boolean(isExternal));
    //    },
    //],

    plugins: [

        // Define free variables
        // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        new webpack.DefinePlugin({ ...GLOBALS, 'process.env.BROWSER': false }),

        //// Adds a banner to the top of each generated chunk
        //// https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
        //new webpack.BannerPlugin('require("source-map-support").install();',
        //    { raw: true, entryOnly: false }),
    ],

    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },

    devtool: 'source-map',
});


export default [clientConfig, serverConfig];