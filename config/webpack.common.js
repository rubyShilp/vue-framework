const webpack = require("webpack");
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
module.exports = {
  entry: {
    main: ["babel-polyfill", "./scripts/main.js", "./scripts/polyfill.js"],
  },
  context: path.join(process.cwd(), "app"),
  resolve: {
    modules: ["node_modules", path.resolve(process.cwd(), "app")],
    alias: {
      vue: path.resolve(process.cwd(), "./node_modules/vue/dist/vue.min.js"),
      "vue-router": path.resolve(
        process.cwd(),
        "./node_modules/vue-router/dist/vue-router.min.js"
      ),
      vuex: path.resolve(process.cwd(), "./node_modules/vuex/dist/vuex.min.js"),
      md5: path.resolve(process.cwd(), "./node_modules/md5/md5.js"),
      "@": path.resolve(process.cwd(), "app/scripts"),
    },
    extensions: [".vue", ".js", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader?cacheDirectory=true",
          options: {
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-syntax-dynamic-import",
              "transform-vue-jsx",
            ],
            presets: ["@babel/preset-env"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|swf)$/,
        use: "url-loader?limit=10000&name=images/[name].[ext]?[hash]",
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",

          {
            loader: "postcss-loader",
            options: {
              plugins: [
                autoprefixer({
                  overrideBrowserslist: [
                    "> 1%",
                    "last 2 versions",
                    "not ie <= 8",
                  ],
                }),
              ],
            },
          },
          {
            loader: "less-loader",
            options: {
              implementation: require("less"),
              prependData: `@env: ${process.env.NODE_ENV};`,
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                autoprefixer({
                  overrideBrowserslist: [
                    "> 1%",
                    "last 2 versions",
                    "not ie <= 8",
                  ],
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  performance: {
    hints: false,
  },
  // optimization:{
  //     splitChunks:{
  //         chunks: "all",
  //     },
  //     runtimeChunk:true
  // },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProgressPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].bundle[hash:7].css",
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      favicon: "./favicon.ico",
      filename: "index.html",
      hash: true, //防止缓存
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      chunksSortMode: "none",
    }),
  ],
};
