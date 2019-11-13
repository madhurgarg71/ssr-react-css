const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const path = require("path")

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "./../../dist"),
    port: 3000,
    compress: true,
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader",
        exclude: /node_modules/
      }
    ]
  }
})
