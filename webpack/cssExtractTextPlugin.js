var ExtractTextPlugin = require("extract-text-webpack-plugin");
var cssExtractTextPlugin =  new ExtractTextPlugin("css/[name].css");
module.exports =  cssExtractTextPlugin;