const withCSS = require('@zeit/next-css');
const webpack = require('webpack');

module.exports = withCSS({
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };

      config.module.rules.push({
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
          use: {
              loader: 'url-loader',
              options: {
                  limit: 100000,
                  name: '[name].[ext]'
              }
          }
      });
      config.watchOptions = {
        ignored: [
          /\.git\//,
          /\.next\//,
          /node_modules/
        ]
      }

    return config
  }
});
