import api from './../res/api';
import http from './http';
import Mlux from 'mlux';
import Util from './../util';
import Pipe from 'pipexjs';

var Device = Util.Device;
var context = '/api'

function getAccessToken(callback) {
    // var accessToken = Mlux.StoreManager.AccessToken.get('value');
    var accessToken = localStorage.getItem('accessToken')
    if (accessToken != '') {
        callback(accessToken);
    } else {
        var url = context + api.getAccessToken;   
        http.sendRequest(url, {
            client: Device.broswer() + '-' + Device.os(),
            device_number: Device.deviceNumber()
        }).success(function (source, next) {
            console.log('getAccessToken>>>>>>', source);
            callback(source.data.access_token)
        }).send();
    }
}

function createAPI(list) {
    var apis = {}
    Object.keys(list).forEach(function (l) {
        apis[l] = function (params, method) {
            // params.user_token = localStorage.getItem('user_token') || ''
            console.log('request params>>>>>>', params);    
            var url = context + list[l];   
            return http.sendRequest(url, params, method).beforeHttp(function (source,next) {
                getAccessToken(function name(accessToken) {
                    console.log('accessToken>>>>>>', accessToken);
                    localStorage.setItem('accessToken', accessToken||'')
                    if(typeof source.params.append == 'function'){
                        source.params.append('access_token', accessToken);
                        source.params.append('user_token', localStorage.getItem('user_token') || '');
                        source.params.append('client_platform', 'pc');
                    }else{
                        source.params.access_token = accessToken;
                        source.params.user_token = localStorage.getItem('user_token') || '';
                        source.params.client_platform = 'pc';
                    }
                    next();
                })
            }).send();
        }
    });
    return apis;
}

export default createAPI(api);
