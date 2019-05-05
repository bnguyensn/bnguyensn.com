/** ********** WEBPACK CONFIG FILE 1/3 ********** **/

const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');

/* Special Note:
   For some reason, webpack.common.js cannot be a function that export a config.
   The console will return  "Configuration file found but no entry configured".
   Hence we are leaving global variables out here.
*/

// *** Constants ***
// This is for url-loader. Files above this size won't be inlined.
const urlLoaderSizeLimit = 1024 * 10; // 10kb

module.exports = {
  // We are building a Single-Page Application, thus only one entry is needed.
  // More entries can be specified for Multi-Page Applications.
  entry: {
    index: path.join(__dirname, 'src/index.js'),
  },

  // Our build process puts all assets (.js, .css, etc.) in a "static" folder.
  // The top-level "dist" folder only contains the index.html file. This
  // index.html file is the one served by our server (e.g. Express) client
  // browsers. This "static" folder helps with organising files.
  output: {
    path: path.join(__dirname, 'dist/static'),
  },

  // *** Loaders ***
  module: {
    rules: [
      // *** JavaScript ***
      // babel-loader allows transpiling JavaScript using Babel and webpack.
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },

      // *** CSS ***
      // Not here. Defined in dev and prod configs.

      // *** Images ***
      // Not here. Defined in dev and prod configs.

      // *** SVGs ***
      // SVGs above the size limit will be loaded using file-loader.
      {
        test: /\.(svg)$/,
        use: {
          loader: 'svg-url-loader',
          options: {
            limit: urlLoaderSizeLimit,
            noquotes: true, // Remove quotes around the encoded URL
          },
        },
        exclude: /node_modules/,
      },

      // *** Images compression ***
      // image-webpack-loader is used for this. It must work in pair with
      // file-loader (which is used for both dev and prod configs for images
      // above the size limit).
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'image-webpack-loader',
          options: {
            // By default, image-webpack-loader optimises JPEGs, PNGs, SVGs,
            // and GIFs. Here we additionally optimises WEBPs.
            webp: {
              enabled: true,
            },
          },
        },
        exclude: /node_modules/,

        // image-webpack-loader must be chained AFTER file-loader. This means
        // it is applied before file-loader.
        // https://github.com/tcoopman/image-webpack-loader#usage
        // The option enforce: 'pre' accomplishes this. It forces
        // image-webpack-loader to be applied before all 'normal' loaders (i.e.
        // other image loaders: file-loader, etc.).
        // https://webpack.js.org/configuration/module/#ruleenforce
        enforce: 'pre',
      },

      // *** Fonts ***
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },

      // *** Texts ***
      {
        test: /\.txt$/,
        use: 'raw-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    // *** Webpack Manifest ***
    // webpack's manifest is a file that tracks how all modules map to output
    // bundles.
    // https://webpack.js.org/guides/output-management/#the-manifest
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

  // This points to the base directory that contains the entry files. By default
  // the current directory is used.
  // https://webpack.js.org/configuration/entry-context/#context
  context: __dirname,

  // webpack records are pieces of data that store module identifiers across
  // multiple builds. They can be used to track how modules change between
  // builds. webpack records are useful for monitoring whether our output chunks
  // are achieving the intended caching behaviours.
  recordsPath: path.join(__dirname, 'webpackRecords.json'),
};
