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
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  module: {
    rules: [
      // .css
      // style-loader and css-loader are used for dev.
      {
        test: /\.css$/,
        use: [
          // style-loader takes CSS code and inserts it into the HTML
          // page via a <style> tag. The tag is appended by default to <head>.
          // https://github.com/webpack-contrib/style-loader
          'style-loader',

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

  // This is made available via webpack-dev-server, which provides a web server
  // and the ability to do live reloading.
  devServer: {
    // This stores the location of the "index.html" for webpack-dev-server.
    // webpack-dev-server doesn't write any files after compiling but keeps them
    // in memory and serves them as if they exist at the server's root path. We
    // have our server's root path as '/' (see output.publicPath).
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
