const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

function addHash(template, hash) {
  const NODE_ENV = process.env.NODE_ENV || 'development';

  return NODE_ENV === 'production' ?
    template.replace(/\.[^.]+$/, `.[${hash}]$&`) : template
}

module.exports = {
  context: path.join(process.cwd(), 'src'),
  entry: {
    app: ['babel-polyfill', 'whatwg-fetch', './index.jsx']
  },
  output: {
    path: path.join(process.cwd(), 'public'),
    publicPath: '/',
    filename: addHash('[name].js', 'hash'),
    chunkFilename: addHash('[id].js', 'chunkhash'),
    library: '[name]'
  },
  devtool: 'source-map',
  resolve: {
    modules: [
      path.resolve(process.cwd()),
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.json', '.css', 'scss', 'sass']
  },
  devServer: {
    stats: {
      chunks: false,
      children: false
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(process.cwd(), 'src'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: () => [
                  autoprefixer
                ]
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(png|gif|jpg|svg|ttf|eot|woff|woff2)$/,
        use: addHash('file-loader?name=[path][name].[ext]', 'hash:6')
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'UI-Deliveries',
      filename: 'index.html',
      template: path.join(process.cwd(), 'index.html')
    }),
    new ExtractTextPlugin({
      filename: addHash('[name].css', 'contenthash'),
      publicPath: '/',
      allChunks: true,
      disable: (NODE_ENV === 'development') || (NODE_ENV === 'test')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),
  ]
};
