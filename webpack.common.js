const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Special Note:
// For some reason, webpack.common.js cannot be a function that export a config
// The console will return  "Configuration file found but no entry configured"
// Hence we have to leave global variables out here

// Vendor packages
const vendorPackages = [
    'react',
    'react-dom'
];
const vendorCDNPackages = {
    // Add any vendor CDN packages
};

module.exports = {
    // Main config
    entry: {
        app: './src/index.js',
        vendor: vendorPackages
    },
    externals: vendorCDNPackages,
    output: {
        path: path.join(__dirname, 'dist/static'),
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
            // Implemented in dev and prod configs
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
        // CommonsChunk
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',  // The common bundle's name
            minChunks: Infinity
        }),
        // HTML creation
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/template.html'),
            filename: '../index.html'
        }),
    ]
};