const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
    const isProduction = env.production === true;
    const platform = env.platform;

    // Vendor packages
    const vendorPackages = [
        'react',
        'react-dom',
        'react-hot-loader'
    ];
    const vendorCDNPackages = {

    };

    // Loader constants
    const urlLoaderSizeLimit = 32000;  // 32kb

    // Main config
    return {
        entry: {
            app: [
                'react-hot-loader/patch',  // This is needed for Hot Module Replacement
                './src/index.js'
            ],
            vendor: vendorPackages
        },
        externals: vendorCDNPackages,
        output: {
            path: path.join(__dirname, 'dist/static'),
            publicPath: isProduction ? 'static/' : '/',
            filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
        },
        module: {
            // Loaders config for various file types
            rules: [
                // .js
                {
                    test: /\.(js|jsx)$/,
                    use: 'babel-loader',
                    exclude: /node_modules/
                },
                // .css
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                /*modules: true,  // TODO: implement CSS modules
                                 localIdentName: '[chunkhash]'*/
                                importLoaders: 1
                            }
                        },
                        'postcss-loader'
                    ],
                    exclude: /node_modules/
                },
                // Images
                {
                    test: /\.(png|jpg|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: urlLoaderSizeLimit,
                            name: isProduction ? 'assets/[chunkhash].[ext]' : 'assets/[name].[ext]'
                        }
                    }, //`url-loader?limit=${urlLoaderSizeLimit}&name=assets/[chunkhash].[ext]`,
                    exclude: /node_modules/
                },
                // JSONs
                {
                    test: /\.(json|geojson)$/,
                    use: 'json-loader',
                    exclude: /node_modules/
                },
                // Texts (raw files)
                {
                    test: /\.txt$/,
                    use: 'raw-loader',
                    exclude: /node_modules/
                },
            ]
        },
        plugins: [
            // UglifyJS - aliasing of this is scheduled for webpack v4.0.0
            // We therefore use the "manual" installation method for now
            /*new webpack.optimize.UglifyJsPlugin({
                sourceMap: true
            }),*/
            new UglifyJSPlugin({
                test: /\.js($|\?)/i,
                sourceMap: true
            }),
            // CommonsChunk
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: Infinity
            }),
            // HTML creation
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/template.html'),
                filename: '../home.html'
            }),
            // Hot Module Replacement
            !isProduction && new webpack.NamedModulesPlugin(),
            !isProduction && new webpack.HotModuleReplacementPlugin()
        ],
        resolve: {
            // ..
        },
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
    }
};