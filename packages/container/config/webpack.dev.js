const { merge } = require("webpack-merge");

const commonconfig = require("./webpack.common.js");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// if you want to avoid setting the shared array manually you can require package.json file and deconstruct the packages.
const { dependencies } = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    // new HTMLWebpackPlugin({
    //   template: "./public/index.html",
    // }),
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: dependencies,
      //  shared: ['react', 'react-dom']
    }),
  ],
};

module.exports = merge(commonconfig, devConfig);
