var webpack = require('webpack');

var path = require('path');
var dir = require('./webpack/dir');

var output = require('./webpack/output');
var resolve = require('./webpack/resolve');
var plugins = require('./webpack/plugins');
var fs = require('fs');
var sh = require('shelljs');
var defaultConfig = {
    context: dir.source,
    output: output,
    resolve: resolve,
    module: {},
    plugins: plugins,
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'echarts':'echarts'
    }
}


function buildConfig(argv) {
    argv = argv.split('--');

    var config;
    var env = argv[0];
    var entry = argv[1];
    var output = argv[2];
    if (env == 'dev') {
        config = require('./webpack.config.dev.js')
    } else {
        config = require('./webpack.config.prod.js')
    }

    config = Object.assign({}, defaultConfig, config);
    config.plugins.push(new webpack.DefinePlugin({
        env: JSON.stringify(env)
    }))
    config.entry = JSON.parse(decodeURI(entry))  ;
    config.output.path =path.resolve('./',output) ;
    return config;
}

module.exports = buildConfig;