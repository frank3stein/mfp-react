const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const { dependencies } = require("../package.json");

const prodConfig = {
  mode: "production",
  output: {
    // for cashing, so the file is always unique
    filename: "[name].[contenthash].js",
    // so when we upload to s3, webpack knows where to look for the files.
    publicPath: "/marketing/latest/",
  },
  // although plugins is identical to dev, we should leave it as it is, and not move to common as we might want to use different settings
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./Marketing": "./src/bootstrap.js",
      },
      shared: dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
