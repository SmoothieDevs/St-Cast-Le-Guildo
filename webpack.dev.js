const config = require("./webpack.config");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(config, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "src"),
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader", // inject css to DOM
          "css-loader", // turn css to commonjs
          "sass-loader", // turn scss to css
        ],
      },
      {
        test: /\.(ttf|woff|woff2|svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      },
    ],
  },
  output: {
    publicPath: "/",
  },
  devtool: "source-map",
  devServer: {
    host: '192.168.1.89',//your ip address
    port: 8080,
    disableHostCheck: true,
    contentBase: path.join(__dirname, "src"),
    watchContentBase: true,
    hot: true,
    open: true,
    inline: true,
  },
});
