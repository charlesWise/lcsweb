var webpack = require('webpack');
var cssExtractTextPlugin = require('./cssExtractTextPlugin');
var plugins = [
        cssExtractTextPlugin,
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:['lib']
        // })
    ];
module.exports = plugins;