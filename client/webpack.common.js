const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack');
 

// copy files from /client..  to /build/..
const CopyWebpackPlugin = require('copy-webpack-plugin')
const devMode = process.env.NODE_ENV !== "production"

module.exports = {
  entry: path.join(__dirname, './src/js/index.ts'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.[chunkhash].js'
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
		use: [
			devMode ? "style-loader" : MiniCssExtractPlugin.loader,
			'css-loader',
			"postcss-loader",
		],
	  },
      {
        test: /\.s(a|c)ss$/,
        // include: /styles/,
        include: [/(.*?)\/(.*?)\/(.*?).scss/],
        // [ path.resolve(__dirname, 'styles') //,
        // path.resolve(__dirname, '/components/*/')
        // ],
        use: [MiniCssExtractPlugin.loader, 'css-loader', "postcss-loader"]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.css'],
  },
  plugins: [
	new Dotenv(),
    // new HtmlWebpackPlugin({
    //  template: './src/main/resources/templates/index.html'
    // }),
    //new ExtractTextPlugin('./style.css'),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      //filename: '/css/main.css',
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
        {
          from: './src/static/fonts',
          to: './fonts'
        },
        {
          from: './src/static/favicon',
          to: './favicon'
        },
        {
          from: './src/static/images',
          to: './images'
        },
        {
          from: '../content/images',
          to: './images'
        },
        {
          from: '../content/thumbnails',
          to: './thumbnails'
        }
      ],
      options: {
        concurrency: 100
      }
    })

  ]
}