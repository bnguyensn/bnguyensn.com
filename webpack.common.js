const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

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

        // Extracting webpack's boilerplate and manifest which can change with every build.
        // By specifying a name not mentioned in the entry configuration, the plugin will
        // automatically extract these into a separate bundle
        // Also note that there's an extra step to this - adding either NamedModulesPlugin
        // or HashedModuleIdsPlugin. See webpack.dev.js and webpack.prod.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'  // The name for webpack's boilerplate and manifest
        }),

        // HTML creation
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/template.html'),
            filename: '../index.html'
        }),

        // Due to an issue in Webpack, chunkhash isn’t deterministic.
        // To ensure hashes are generated based on the file contents,
        // use webpack-md5-hash plugin.
        new WebpackMd5Hash(),
    ]
};