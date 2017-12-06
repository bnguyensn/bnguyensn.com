const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = () => {
    // Loader constants
    const urlLoaderSizeLimit = 32000;  // 32kb

    // Main config
    return merge(common, {
        output: {
            publicPath: '/',  // Different from prod config
            filename: '[name].js',  // Different from prod config
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
                            name: 'assets/[name].[ext]'  // Different from prod config
                        }
                    }, //`url-loader?limit=${urlLoaderSizeLimit}&name=assets/[chunkhash].[ext]`,
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            // Define environment
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development')
            }),

            // Webpack caching. This is needed to cache the manifest file correctly
            // For production builds, we use HashedModuleIdsPlugin instead
            new webpack.NamedModulesPlugin(),
        ],
        devtool: 'inline-source-map',
        devServer: {
            // The location of the "index.html" for webpack-dev-server:
            contentBase: path.join(__dirname, 'src'),

            compress: true,
            port: 8080,
            overlay: {
                errors: true,
                warnings: true
            },
            hot: true  // Hot Module Replacement
        }
    });
};