/** ********** WEBPACK CONFIG FILE 2/3 ********** **/

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// Constants
const urlLoaderSizeLimit = 1024 * 10;  // 10kb

module.exports = () => merge(common, {

    mode: 'development',

    output: {
        publicPath: '/',  // Different from prod config
        filename: '[name].js',  // Different from prod config
        chunkFilename: '[name].js',  // Different from prod config
    },

    module: {
        rules: [
            // .css - We use ExtractTextPlugin for prod. This plugin can't be
            // used in dev because it does not work with HotModuleReplacement
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // CSS modules can be implemented here
                            // modules: true,
                            // We no longer need the [chunkhash] in webpack 4
                            // localIdentName: '[chunkhash]'
                            importLoaders: 2,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
                exclude: /node_modules/,
            },

            // Images (PNG | JPG | GIF)
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    // url-loader has automatic file-loader fallback
                    loader: 'url-loader',
                    options: {
                        limit: urlLoaderSizeLimit,
                        // Different from prod config
                        name: 'assets/[name].[ext]',
                    },
                },
                exclude: /node_modules/,
            },

        ],
    },

    plugins: [
        // NamedChunksPlugin is enabled in development mode by default
        // NamedModulesPlugin is enabled in development mode by default
        // Hot Module Replacement
        new webpack.HotModuleReplacementPlugin(),
    ],

    devtool: 'inline-source-map',

    devServer: {
        // The location of the "index.html" for webpack-dev-server:
        contentBase: path.join(__dirname, 'src/homepage/html-templates'),

        compress: true,
        port: 8080,
        overlay: {
            errors: true,
            warnings: true,
        },

        // Options for serving static files. Follow express rules.
        staticOptions: {
            // This is needed to serve html files other than 'index.html'.
            extensions: ['html'],
        },

        // Because we are involving (note: not using) an Express dev server
        proxy: {
            '/login/api': 'http://localhost:63343',
        },

        historyApiFallback: {
            rewrites: [
                // Redirects homepage-related URLs
                {from: '/about', to: '/index.html'},
                {from: '/archive', to: '/index.html'},
                {from: '/projects', to: '/index.html'},
                {from: '/contact', to: '/index.html'},
                {from: '/404', to: '/index.html'},
            ],
        },

        // Hot Module Replacement
        hot: true,

        // TODO: optimization is currently invalid for webpack-dev-server.
        //  Check back later
        /*optimization: {
            // namedModules is on by default for development
            namedModules: true
        }*/
    },
});
