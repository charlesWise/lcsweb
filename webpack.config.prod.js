
var plugins = require('./webpack/plugins');
var modules = require('./webpack/modules.prod');
var webpack = require('webpack');
var WebpackShellPlugin = require('webpack-shell-plugin');
module.exports = {
    devtool:'cheap-module-source-map',
    module:modules,
    plugins:plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            },
            comments:false,
            mangle:{
                except:['$super','$','exports','require']
            }
        }),
        // new WebpackShellPlugin({
        //     onBuildEnd:['webpack --colors --config ./webpack.config.compile.js']
        // }),
        new webpack.DefinePlugin({
             __DEV__: false,
            'process.env': {
                 NODE_ENV: '"production"'
            }
        })
    ])
}