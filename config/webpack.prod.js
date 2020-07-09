const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const uglifyjsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = merge(commonConfig, {
  output: {
    path: path.join(process.cwd(), "dist"),
    publicPath: "/",
    filename: "js/[name].bundle[hash:7].js",
    chunkFilename: "js/[name].bundle[hash:7].js",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  //压缩js
  optimization: {
    minimizer: [
      new uglifyjsPlugin({
        uglifyOptions: {
          compress: false,
        },
      }),
      new OptimizeCssAssetsPlugin(),
    ],
  },
});
