'use strict'
import { HTTP, Device } from 'util';
import Mlux from 'mlux';
import Pipe from 'pipexjs';

const API_URl = 'https://testapi.cfylicai.com';

function emptyHandler(source, next, abort) {
    next();
}
function errorHanlder(source, next, abort) {
    // APPContext.toast(source.message);
    next();
}
function permissionErrorHandler(source, next, abort) {
    window.location.href = '/login.html'
    //登录成功再请求一次接口 失败不做处理
    // next();
}
function failHandler(source, next, abort){
    next();
}
function sendHanlder(source, next, abort){
    httpRequest(source.url, source.params, source.method).then((content) => {
        // this._successPipe.source(content);
        console.log('==========>reponse:' + source.url, content);
        if (content.status == '2000') {
            content.httpResult = source;
            return source._permissionErrorPipe.source(content);
        } else if (content.boolen != '1') {
            source._errorPipe.source(content);
        } else {
            source._successPipe.source(content);
        }
    }, (args) => {
        console.log('==========>reponse err:' + source.url, args)
        source._failPipe.source(args);
    });
    next();
}
function post(url, params) {
    return HTTP.post(url, params)
}
function get(url, params) {
    return HTTP.get(url, params);
}
function httpRequest(url, params, method) {
    if(method=='get'){
        return get(url, params, method)
    }else{
        return post(url, params, method);
    }
}


class HttpResult {
    constructor(url, params, method) {
        this.url = url;
        this.params = params;
        this.method = method;
        this._httpPipe = new Pipe(emptyHandler,sendHanlder)
        this._errorPipe = new Pipe(emptyHandler, errorHanlder);
        this._permissionErrorPipe = new Pipe(emptyHandler, permissionErrorHandler);
        this._failPipe = new Pipe(emptyHandler, failHandler);
        this._successPipe = new Pipe();
    }
    beforeHttp(pipeCallback,isBefore){
        let loadingEl = document.getElementById('react-loading');
        loadingEl.style.display = 'block';
        if (isBefore) {
            this._httpPipe.unshift(pipeCallback);
        } else {
            this._httpPipe.append(pipeCallback);
        }
        return this;
    }
    error(pipeCallback, isBefore) {
        let loadingEl = document.getElementById('react-loading');
        loadingEl.style.display = 'none';
        if (isBefore) {
            this._errorPipe.unshift(pipeCallback);
        } else {
            this._errorPipe.append(pipeCallback);
        }
        return this;
    }
    permissionError(pipeCallback, isBefore) {
        let loadingEl = document.getElementById('react-loading');
        loadingEl.style.display = 'none';
        if (isBefore) {
            this._permissionErrorPipe.unshift(pipeCallback);
        } else {
            this._permissionErrorPipe.append(pipeCallback);
        }
        return this;
    }
    fail(pipeCallback, isBefore) {
        let loadingEl = document.getElementById('react-loading');
        loadingEl.style.display = 'none';
        if (isBefore) {
            this._failPipe.unshift(pipeCallback);
        } else {
            this._failPipe.append(pipeCallback);
        }
        return this;
    }
    success(pipeCallback, isBefore) {
        let loadingEl = document.getElementById('react-loading');
        loadingEl.style.display = 'none';
        if (isBefore) {
            this._successPipe.unshift(pipeCallback);
        } else {
            this._successPipe.append(pipeCallback);
        }
        return this;
    }
    send() {
        this._httpPipe.source(this);
        return this;
    }
}

function sendRequest(url, params={}, method) {
    if (!params) {
        method = 'post';
    }
    method = method || 'post';
    // url = API_URl + url;
    var httpResult = new HttpResult(url, params, method);
    // httpResult.send();
    return httpResult;
}
function createAPI(list) {
    var apis = {}
    Object.keys(list).forEach(function (l) {
        apis[l] = function (params, method) {
            return sendRequest(list[l], params, method);
        }
    });
    return apis;
}

export default {
    createAPI,
    sendRequest
}