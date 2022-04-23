const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    "index": "./js/index.js",
    "flightDetails": "./js/flightDetails.js",
    "summary": "./js/summary.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].bundle.js",
    clean: true
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./views/index.ejs",
      filename: 'index.html',
      hash: false,
      inject: true,
      compile: true,
      favicon: false,
      minify: false,
      cache: true,
      showErrors: true,
      chunks: 'all',
      excludeChunks: [],
      title: 'Webpack App',
      xhtml: false
    }),
    // new HtmlWebpackPlugin({
    //   template: "./views/login.ejs",
    //   inject: true,
    //   chunks: ['login'],
    //   filename: 'login.html'
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./views/signup.ejs",
    //   inject: true,
    //   chunks: ['signup'],
    //   filename: 'signup.ejs'
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./views/summary.ejs",
    //   inject: true,
    //   chunks: ['summary'],
    //   filename: 'summary.ejs'
    // }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: "./assets/img/**",
        to() {
          return "assets/img/[name][ext]";
        },
      }],
    }),
  ],
  module: {
    rules: [{
        test: /\.scss$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  ["autoprefixer"]
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.ejs$/,
        loader: 'compile-ejs-loader',
        options: {
          'htmlmin': true,
          'htmlminOptions': {
            removeComments: true
          }
        }
      }
    ]
  }
}