'use strict'

function queryString(wd){    
    var rQuery = new RegExp("(^|&)"+ wd +"=([^&]*)(&|$)");
    if(window.location.search.split("?").length <= 1){
        return '';
    }
    var search = window.location.search.split("?")[1];
    var value = '';
    var result;
    if(result = search.match(rQuery)){
        value = decodeURIComponent(RegExp.$2);
        if(value=='undefined'){
            return result[0].split('=')[1];
        }else{
            return value;
        }
    }
    return '';
}

function getObjectValues(object){
    var arr = Object.keys(object).map(function(key) {
        return object[key];
    })

    return arr;
}
module.exports = {
    queryString,
    getObjectValues
}