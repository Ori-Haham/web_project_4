const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: {
    main: "src/pages/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },
  target: ["web", "es5"],
  stats: { children: true }, // Show child compilation errors from plugins
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        // to process tese files, use
        // MiniCssExtractPlugin.loader and css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            // add an options object
            options: { importLoaders: 1 },
          },
          // add postcss-loaderr
          "postcss-loader",
        ],
      },
      {
        // add the rule for processing files
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(), // connect the plugin for merging CSS files
  ],
};
