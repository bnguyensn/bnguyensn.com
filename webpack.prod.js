/** ********** WEBPACK CONFIG FILE 3/3 ********** **/

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** The main configuration */
module.exports = () => {
    // Loader constants
    const urlLoaderSizeLimit = 32000;  // 32kb

    // Main config
    return merge(common, {
        output: {
            publicPath: 'static/',  // Different from dev config
            filename: '[name].[chunkhash].js',  // Different from dev config
        },

        module: {
            rules: [
                // Images
                {
                    test: /\.(png|jpg|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: urlLoaderSizeLimit,
                            name: 'assets/[chunkhash].[ext]'  // Different from dev config
                        }
                    }, //`url-loader?limit=${urlLoaderSizeLimit}&name=assets/[chunkhash].[ext]`,
                    exclude: /node_modules/
                }
            ]
        },

        plugins: [
            // Define environment
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')  // Different from dev config
            }),

            // UglifyJS - aliasing of this is scheduled for webpack v4.0.0
            // We therefore use the "manual" installation method for now
            /*new webpack.optimize.UglifyJsPlugin({
                sourceMap: true
            }),*/
            new UglifyJSPlugin({
                test: /\.js($|\?)/i,
                sourceMap: true,
            }),

            // HTML creation
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/html/t_index.html'),
                //inject: true,
                chunks: ['index', 'vendor', 'manifest'],
                filename: '../index.html'
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/html/t_login.html'),
                //inject: true,
                chunks: ['login', 'vendor', 'manifest'],
                filename: '../login.html'
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/html/t_chat.html'),
                //inject: true,
                chunks: ['chat', 'vendor', 'manifest'],
                filename: '../chat.html'
            }),

            // Webpack caching. This is needed to cache the manifest file correctly
            // For development builds, we use NamedModulesPlugin instead
            new webpack.HashedModuleIdsPlugin(),
        ],

        devtool: 'source-map',
    });
};