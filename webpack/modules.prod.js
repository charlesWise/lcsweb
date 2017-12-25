var dir = require('./dir');
var cssExtractTextPlugin = require('./cssExtractTextPlugin');
module.exports = {
    rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude:dir.nodeModules
        },
        {
            test: /\.css$/,
            loader: cssExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
        },
        {
            test: /\.scss$/,
            use: cssExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                fallback: "style-loader"
            })
        }
    ],
}