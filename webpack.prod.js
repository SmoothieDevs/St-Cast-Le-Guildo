const config = require("./webpack.config");
const { merge } = require("webpack-merge");
const path = require("path");
const glob = require("glob");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");

const PURGEPATH = {
  src: path.join(__dirname, "src"), // html files to check for purge
};

module.exports = merge(config, {
  mode: "production",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
    // when purging add the .js also
    new PurgecssPlugin({
      paths: glob.sync(`${PURGEPATH.src}/**/*`, { nodir: true }),
      // whiteListPatterns: [/\[type\=\S*\]/],
      // whiteListPatterns: [/type\=\S*/],
      safelist: ["basicLightbox--visible", "basicLightbox", "basicLightbox__placeholder"],
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ttf|woff|woff2|svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // without additional settings, this will reference .babelrc
        use: "babel-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, // extract css from commonjs
          "css-loader", // turn css into commonjs
          "sass-loader", // turn scss into css
        ],
      },
      
    ],
  },
  output: {
    publicPath: "./",
  },
});
