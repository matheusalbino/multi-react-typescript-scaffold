const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv)=> {

  const OUTPUT_DIR = path.resolve(__dirname, 'dist');
  const isProduction = argv.mode === 'production';

  const plugins = [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: 'My App',
    })
  ];

  const cssLoader = []

  if(isProduction === true) {
    plugins.push(
      new CopyPlugin({
        patterns: [
          { from: 'public', to: OUTPUT_DIR },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[hash].css',
      }),
      new CleanWebpackPlugin()
    );

    cssLoader.push(
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../',
        },
      },
     'css-loader'
    );
  } else {
    cssLoader.push('style-loader', 'css-loader')
  }

  return {
    entry: './src/index.tsx',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: cssLoader,
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
      filename: 'static/js/[name].[hash].js',
      path: OUTPUT_DIR,
    },
    plugins,
    devServer: {
      contentBase: OUTPUT_DIR,
      compress: true,
      port: 3000
    }
  };
};
