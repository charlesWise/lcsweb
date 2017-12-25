var path = require('path');
var nodeModules = path.resolve(__dirname, '../node_modules');
//资源文件根目录
var js = path.resolve(__dirname, '../js');
var source = path.resolve(__dirname, '../');
var util = path.resolve(js, 'util');
var libs = path.resolve(js, 'libs');
var controller = path.resolve(js, 'controller');
var res = path.resolve(js, 'res');
var stores = path.resolve(js, 'stores');
var widget = path.resolve(js,'widget');
module.exports = {
    nodeModules,
    js,
    util,
    libs,
    controller,
    res,
    stores,
    widget,
    source
}