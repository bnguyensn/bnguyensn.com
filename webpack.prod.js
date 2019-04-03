/** ********** WEBPACK CONFIG FILE 3/3 ********** **/

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const common = require('./webpack.common.js');

// Constants
const urlLoaderSizeLimit = 1024 * 10;  // 10kb

module.exports = () => merge(common, {
  mode: 'production',

  output: {
    // This public URL is prefixed to every URL created by webpack. It is
    // the URL of our output.path (webpackOptions.output.path is defined in the
    // common config) from the view of the HTML page.
    // Note: include the prefix '/' for server-relative URLs.
    publicPath: '/static/',

    filename: '[name].[contenthash].js',

    // Placeholders like [name] or [chunkhash] require a mapping from chunk
    // id to placeholders to output files, increasing the final bundle size.
    // Thus we switch from [name] to [id] in production.
    chunkFilename: '[id].[contenthash].js',  // Different from dev config
  },

  module: {
    rules: [
      // .css
      // MiniCSSExtractTextPlugin is used for prod. This plugin can't be
      // used in dev because it does not support HMR yet.
      {
        test: /\.css$/,
        use: [
          // mini-css-extract-plugin extracts CSS into separate files.
          // There is also a plugin component.
          // https://github.com/webpack-contrib/mini-css-extract-plugin
          MiniCssExtractPlugin.loader,

          // css-loader interprets @import and url() like statements and resolve
          // them.
          // https://github.com/webpack-contrib/css-loader
          {
            loader: 'css-loader',
            options: {
              // How many other loaders are applied before css-loader
              importLoaders: 1,
            },
          },

          // postcss-loader is added on top to handle cross-browser
          // compatibility with its autoprefixer plugin.
          'postcss-loader',
        ],
        exclude: /node_modules/,
      },

      // Images
      // url-loader is used to load images. It automatically fallback to
      // file-loader for file sizes above the specified limit
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: urlLoaderSizeLimit,
            name: 'assets/[name].[contenthash].[ext]',
          },
        },
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    // mini-css-extract-plugin extracts CSS into separate files.
    // There is also a loader component.
    // https://github.com/webpack-contrib/mini-css-extract-plugin
    new MiniCssExtractPlugin({
      // Options are similar to webpackOptions.output
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
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
      template: path.resolve(
        __dirname,
        'src/html-templates/index_prod.html',
      ),
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
      // Note: optimization.splitChunks also appears in our dev config.
      // Since the chunk name includes all origin chunk names it’s
      // recommended for production builds with long term caching to NOT
      // include [name] in the filenames, or switch off name generation
      // via optimization.splitChunks.name: false
      name: false,
    },


    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        // sourceMap: true,  // Disabled for now
      }),

      new TerserJSPlugin({}),

      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,

      }),
    ],

    // This is on by default in production mode
    // concatenateModules: true
  },
});
