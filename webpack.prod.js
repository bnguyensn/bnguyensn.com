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
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const common = require('./webpack.common.js');

// Constants
const urlLoaderSizeLimit = 1024 * 10; // 10kb

module.exports = () =>
  merge(common, {
    mode: 'production',

    output: {
      // This public URL is prefixed to every URL created by webpack. It is
      // the URL of our output.path (webpackOptions.output.path is defined in the
      // common config) from the view of the HTML page.
      // Note: include the prefix '/' for server-relative URLs.
      publicPath: '/static/',

      // [contenthash]: change based on the asset's content
      // However, contenthash will not stay the same between builds even if the
      // asset's content hasn't changed. To make contenthash deterministic, we
      // need to extract out webpack's runtime and manifest (together
      // "boilerplate"). This can be achieved via the SplitChunksPlugin.
      filename: '[name].[contenthash].js',

      // Placeholders like [name] or [chunkhash] require a mapping from chunk
      // id to placeholders to output files, increasing the final bundle size.
      // Thus we switch from [name] to [id] in production.
      chunkFilename: '[id].[contenthash].js', // Different from dev config
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

            // css-loader interprets @import and url() like statements and
            // resolve them.
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
        template: path.resolve(__dirname, 'src/html-templates/index_prod.html'),
        chunks: ['index', 'vendors', 'runtime~index'],
        filename: '../index.html',
      }),

      // This is relevant to caching. Output chunks' hashes could change due to
      // changes in module.id and our caches will be busted unintentionally.
      // The HashedModuleIdsPlugin causes hashes to be based on the relative
      // paths of modules and prevent this issue.
      // For development builds, we use NamedModulesPlugin instead. This is
      // enabled in mode: 'development' by default.
      new webpack.HashedModuleIdsPlugin(),

      // Visualise webpack output file sizes with an interactive zoomable
      // treemap.
      // https://github.com/webpack-contrib/webpack-bundle-analyzer
      new BundleAnalyzerPlugin(),
    ],

    //devtool: 'source-map',

    optimization: {
      // Note: continued config from common
      splitChunks: {
        // Since the chunk name includes all origin chunk names it’s
        // recommended for production builds with long term caching to NOT
        // include [name] in the filenames, or switch off name generation
        // via optimization.splitChunks.name: false
        name: false,
      },

      // This is relevant to caching. By default, the [contenthash] of an input
      // file will change between webpack builds even if the input's contents
      // stay the same. This is because webpack's runtime (or boilerplate) code
      // is ingrained into [contenthash].
      // We fix this by extracting out the runtime code using the runtimeChunk
      // property.
      // 'single': webpack generates one single chunk containing runtime code.
      // 'multiple': webpack generates one chunk for each entry point containing
      // runtime code.
      runtimeChunk: 'single',

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
