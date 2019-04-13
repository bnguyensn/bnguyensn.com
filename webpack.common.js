/** ********** WEBPACK CONFIG FILE 1/3 ********** **/

const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');

/* Special Note:
   For some reason, webpack.common.js cannot be a function that export a config
   The console will return  "Configuration file found but no entry configured"
   Hence we have to leave global variables out here.
*/

// Constants
const imgLoaderSizeLimit = 1024 * 10; // 10kb

module.exports = {
  entry: {
    index: './src/index.js',
  },

  // All our assets (.js, .css, etc.) are in a "static" folder. The top-level
  // "dist" folder only contains the index.html file. This index.html file will
  // be served by our server (e.g. Express) to the browser.
  output: {
    path: path.join(__dirname, 'dist/static'),
  },

  module: {
    rules: [
      // .css
      // Not here. Defined in dev and prod configs.

      // .js
      // babel-loader allows transpiling JavaScript using Babel and webpack.
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },

      // Images
      // Not here. Defined in dev and prod configs.

      // .svg
      {
        test: /\.(svg)$/,
        use: {
          loader: 'svg-url-loader',
          options: {
            limit: imgLoaderSizeLimit,
            noquotes: true, // Remove quotes around the encoded URL
          },
        },
        exclude: /node_modules/,
      },

      // Images compression
      // image-webpack-loader is used for this. It must work in pair with
      // url-loader (used for both dev and prod configs) and svg-url-loader.
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'image-webpack-loader',
        },
        // enforce: 'pre' is a webpack option that forces this loader to
        // load first (in this case, before other image loader)
        enforce: 'pre',
        exclude: /node_modules/,
      },

      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },

      // JSONs
      // webpack 4.0+ handles JSON natively

      // Texts (raw files)
      {
        test: /\.txt$/,
        use: 'raw-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new ManifestPlugin({
      fileName: 'webpackManifest.json',
    }),
  ],

  optimization: {
    // *** SplitChunksPlugin ***
    // The SplitChunksPlugin optimise imported modules (chunks) via preventing
    // duplicated chunks from being generated. Duplicated chunks could be
    // generated if files import (require) the same dependencies (common
    // dependencies).
    // Note: extra configuration in prod
    splitChunks: {
      // By default, optimization.splitChunks only works for async chunks. This
      // tell webpack to optimise both async and non-async (initial) imports.
      // Note that optimising initial imports will affect the script tags in
      // the HTML file.
      chunks: 'all',

      // *** Split conditions ***
      // The split conditions are ranked in order of priority. Commented out
      // values are default values and thus no need to be specified.

      // 1. Chunks must be at least this large (in b) to be generated.
      // minSize: 30000

      // 2. Chunks larger than this (in b) will be split further. New chunks
      // will be at least minSize. maxSize could be violated when a single
      // module is bigger than maxSize or when new chunks are smaller than
      // minSize.
      // maxSize: 0

      // 3 & 4. Maximum number of parallel requests for on-demand (lazy)
      // loading and entry point loading
      // maxAsyncRequests: 5
      // maxInitialRequests: 3

      // By default, there are two cache groups: 'vendors' and 'default'
      cacheGroups: {
        // This 'vendors' cache group will extract third-party libraries to
        // a separate 'vendors' chunk. We want this because third-party
        // libraries are less likely to change and consequently bust our cache.
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
        },
      },
    },
    // occurrenceOrder keeps filename consistent between different modes (for example
    // building only)
    occurrenceOrder: true,
    runtimeChunk: true,
  },

  context: __dirname,
};
