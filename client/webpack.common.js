const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin"); // Импорт уже был
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const devMode = process.env.NODE_ENV !== "production"

module.exports = {
  entry: path.join(__dirname, './src/js/index.ts'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.[chunkhash].js',
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/i,
        oneOf: [
          {
            include: [path.resolve(__dirname, 'src/static/libs'), path.resolve(__dirname, 'node_modules/katex')],
            use: [
              devMode ? "style-loader" : MiniCssExtractPlugin.loader,
              'css-loader',
            ],
          },
          {
            use: [
              devMode ? "style-loader" : MiniCssExtractPlugin.loader,
              'css-loader',
              "postcss-loader",
            ],
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        include: [/(.*?)\/(.*?)\/(.*?).scss/],
        use: [MiniCssExtractPlugin.loader, 'css-loader', "postcss-loader"]
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/i,
        type: 'asset/resource',
      },
      // --- Regeln für Bilder ---
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        type: 'asset/resource', // Nutzt die neue Asset Modules API
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        //find font files and add to sub-folders
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          // [hash] left unicate but put to the sub-folders
          filename: 'assets/fonts/[name].[hash][ext][query]'
        },
      },
    ]
  },
  // --- OPTIMIERUNGSABSCHNITT (HINZUGEFÜGT) ---
  optimization: {
    minimizer: [
      "...", // Magie: behält die Standard-Minimierung von JS/CSS bei
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              jpeg: {
                  quality: 75,
                  progressive: true
                },
              webp: {
                  quality: 80,
                  alphaQuality: 80 
                },
              png: {
                  compressionLevel: 9,
                  adaptiveFiltering: true,
                  palette: true
                },
            },
          },
        },
        // --- Generation WEBP, doesnt work, need paths ---
        /*
        generator: [
          {
            type: "asset",
            implementation: ImageMinimizerPlugin.sharpGenerate,
            options: {
              encodeOptions: {
                webp: { quality: 75 },
              },
            },
          },
        ],
          */
      }),
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.css'],
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/templates/index.html"),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/static/fonts', to: './fonts' },
        { from: './src/static/favicon', to: './favicon' },
        { from: './src/static/images', to: './images' },
        { from: '../content/images', to: './images' },
        { from: '../content/thumbnails', to: './thumbnails' },
        { from: './robots.txt', to: './robots.txt' },
        { from: './sitemap.xml', to: './sitemap.xml' }
      ],
      options: {
        concurrency: 100
      }
    }),
    // make 1 chunk file and no more
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1, 
    }),
  ]
}