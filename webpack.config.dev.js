var modules = require('./webpack/modules.dev');
var plugins = require('./webpack/plugins');
var WebpackShellPlugin = require('webpack-shell-plugin');
var webpack = require('webpack');
module.exports = {
    devtool:'cheap-module-eval-source-map',
    module:modules,
    plugins:plugins.concat([
        new WebpackShellPlugin({
        }),
        new webpack.DefinePlugin({
            __DEV__: true,
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ])

}