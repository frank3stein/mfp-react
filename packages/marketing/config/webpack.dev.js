const { merge} = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const commonconfig = require('./webpack.common.js');

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
        })
    ]
}

module.exports = merge(commonconfig, devConfig);