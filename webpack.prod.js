/** ********** WEBPACK CONFIG FILE 3/3 ********** **/

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

// Constants
const urlLoaderSizeLimit = 1024 * 10;  // 10kb

module.exports = () => merge(common, {

    mode: 'production',

    output: {
        publicPath: '/static/',  // Different from dev config. Be careful to include the prefix '/'
        filename: '[name].[contenthash].js',  // Different from dev config
        chunkFilename: '[name].[contenthash].js',  // Different from dev config
    },

    module: {
        rules: [
            // .css
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
                exclude: /node_modules/,
            },

            // Images (PNG | JPG | GIF)
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',  // url-loader has automatic file-loader fallback
                    options: {
                        limit: urlLoaderSizeLimit,
                        // [chunkhash] does not work when loading large files. Reasons = unknown
                        name: 'assets/[name].[contenthash].[ext]',  // Different from dev config
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[name].[contenthash].css',
        }),

        /* UglifyJS - aliasing of this is scheduled for webpack v4.0.0
         * the below code was for 3.0
         */
        /*new UglifyJSPlugin({
            test: /\.js($|\?)/i,
            sourceMap: true,
        }),*/

        // HTML creation
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/homepage/html-templates/index_prod.html'),
            //inject: true,
            chunks: ['index', 'vendors', 'runtime~index'],
            filename: '../index.html',
        }),

        // Webpack caching. This is needed to cache the manifest file correctly
        // For development builds, we use NamedModulesPlugin instead
        new webpack.HashedModuleIdsPlugin(),
    ],

    //devtool: 'source-map',

    optimization: {

        splitChunks: {
            // Note: optimization.splitChunks also appears in webpack.common.js config
            // Since the chunk name includes all origin chunk names it’s recommended for production builds
            // with long term caching to NOT include [name] in the filenames,
            // or switch off name generation via optimization.splitChunks.name: false
            name: false,
        },
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                // sourceMap: true,  // Disabled for now
            }),
        ],

        // This is on by default in production mode
        // concatenateModules: true
    },
});
