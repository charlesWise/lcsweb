var  {renderToString} = require('react-dom/server');

var currentTag;
var tags = {

}
global.React = require('react');
global.ReactDOM = require('react-dom');

global.echarts = {};

global.AvatarEditor = function() {
    return null;
};

global.window = {
    location: {
        href: '',
        pathname: '',
        reload: function(){}
    }
};
global.location = {
    pathname: '',
    reload: function () { }
}
global.window.matchMedia = function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};
global.matchMedia = function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};
global.navigator = {
    userAgent: ''
}
global.document = {
    getElementById: function () {

    },
    documentElement : {
        doScroll: null
    },
    createElement: function () {

    }
}
// global.mlux = {
//     StoreManager:{
//         load:function(){
//             return Promise.resolve()
//         }
//     }
// }
window.setTimeout = function () {}
window.jQuery = {};
window.$ = {};
window.jiathis_config = {};
window.document = {
    getElementById: function () {

    },
    documentElement: {
        doScroll: false
    },
    createElement:function(){
        
    },
    location:{
        href:'',
        pathname: '',
        reload: function () { }
    }
}
global.AppRegister = {
    setTag:function(tag){
        currentTag = tag;
    },
    registerSide: function (app) {
    },
    registerLoading: function (app) {
    },
    registerById: function (app, domId) {
    },
    register:function(app){
        tags[currentTag] = renderToString(app);
    },
    getTag:function(tag){
        return tags[tag];
    }
}