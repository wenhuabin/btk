const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      ExtractTextPlugin = require("extract-text-webpack-plugin")
      WebpackMd5Hash = require('webpack-md5-hash');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const minifyConfig = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
};

var SRC_PATH= path.resolve(__dirname, './src');
console.log(SRC_PATH);

var config = {
    entry: {
        index: './src/home/index'
    },
    output: {
        publicPath: './bin',
        path: path.resolve(__dirname,'./bin'),
        filename: 'js/[id].[chunkhash].js',
    },
    module: {
        loaders: [
                {
                  test: /\.js$/,
                  exclude: /node_modules/,
                  loader: 'babel',
                  query: {
                    presets: ['es2015']
                  }
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
                },
                {
                    test: /\.(png|jpg)$/,
                    loader: 'url?limit=8192'
                },
        ]
    },
    resolve: {
        root:[SRC_PATH],
        alias: {
            'images':'images'
        }
    },
    plugins: [
     new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
     }),
     new CleanWebpackPlugin(['bin'],{
      root: path.resolve(__dirname,'./bin'),
      verbose: true, 
      dry: false,
     }),
     new HtmlWebpackPlugin({
      filename: 'index.html',
      title: '读书旅行',
      template: './src/home/index.html',
      chunks: ['index'],
      minify: minifyConfig
     }),
     new HtmlWebpackPlugin({
      filename: '404.html',
      title: '读书旅行',
      template: './src/home/404.html',
      minify: minifyConfig
     }),
     // new webpack.optimize.CommonsChunkPlugin("common.js", ['spread','commission','record','bind','unbind']),
     new ExtractTextPlugin("css/[id].[hash].css", {
      // allChunks: true
     }),
     new WebpackMd5Hash()
  ],
    node: {
      fs: "empty"
    }
};
if(env !== 'development') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
    },
    output: {
        comments: false,
    },
  }));
}
module.exports = config;
