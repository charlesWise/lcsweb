var dir = require('./webpack/dir');
var path = require('path');
var webpack = require('webpack');
var resolve = require('./webpack/resolve');
var prodModules = require('./webpack/modules.prod');
var WebpackShellPlugin = require('webpack-shell-plugin');
var cssExtractTextPlugin = require('./webpack/cssExtractTextPlugin');

var modules = {
    
}
module.exports = {
    context: dir.source,
    entry: ["babel-polyfill",path.resolve(dir.js, 'render.js')],
    output: {
        path: path.resolve(__dirname,'compile'),
        filename: 'render.js',
    },
    module:Object.assign(modules,prodModules),
    resolve,
    plugins:[
        cssExtractTextPlugin,
        // new WebpackShellPlugin({
        //    // onBuildEnd:['gulp build']
        // })
    ],
    externals:{
        'libs/jquery':'jquery',
       // 'mlux':'mlux'
    },
};