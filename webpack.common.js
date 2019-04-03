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

  // webpack 4.0 CommonsChunkPlugin replacement
  optimization: {
    splitChunks: {
      // By default, optimization.splitChunks only works for async chunks
      // We need to specify chunks: 'all' to scope in initial chunks
      chunks: 'all',
      cacheGroups: {
        // The below piece of code creates a commons chunk that includes
        // all code shared between entry points. Currently it's not
        // used.
        /*commons: {
            name: "commons",
            chunks: "initial",
            minChunks: 2,
        }*/
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
