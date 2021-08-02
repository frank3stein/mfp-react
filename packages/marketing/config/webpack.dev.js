const { merge} = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonconfig = require('./webpack.common.js');
const { dependencies} = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port:8081,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html',
        }),
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './Marketing': './src/bootstrap.js'
            },
            shared: dependencies
            // shared: ['react', 'reactdom'],
        })
    ]
}

module.exports = merge(commonconfig, devConfig);