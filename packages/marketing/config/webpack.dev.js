const { merge } = require("webpack-merge");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonconfig = require("./webpack.common.js");
const { dependencies } = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8081/", // dont forget the slash at the end
  },
  devServer: {
    port: 8081,
    historyApiFallback: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./Marketing": "./src/bootstrap.js",
      },
      shared: dependencies,
      // shared: ['react', 'reactdom'],
    }),
  ],
};

module.exports = merge(commonconfig, devConfig);
