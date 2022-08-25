const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Home | Frontend Boilerplate",
      template: "./src/index.html",
      minify: {
        removeRedundantAttributes: false,
      },
    }),
    ///// COPY and PASTE for Other Pages
    /* new HtmlWebpackPlugin({
      title: "Blog | Frontend Boilerplate",
      filename: "blog.html",
      template: "./src/views/blog.html",
    }), */
    // restart server after adding new page
  ],
};
