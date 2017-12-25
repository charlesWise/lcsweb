'use strict'
import React from 'react';
import Mlux from 'mlux';
import {
    render
} from 'react-dom';
import Util from 'util';
var sessionStoreList = [
    
];
function parseJSON(value) {
    if (typeof value !== 'string') {
        return value;
    } else {
        return JSON.parse(value);
    }
}
function stringifyJSON(value) {
    if (typeof value !== 'object') {
        return value;
    } else {
        return JSON.stringify(value);
    }
}
var session = sessionStorage;
var storage = localStorage;
var storageTool = {
    setter: function (name, value) {
        value = stringifyJSON(value);

        if (sessionStoreList.indexOf(name) >= 0) {
            session.setItem(name, value);
        } else {
            storage.setItem(name, value);
        }
        return Promise.resolve(true);
    },
    getter: function (name) {
        var value;
        if (sessionStoreList.indexOf(name) >= 0) {
            value = session.getItem(name);
        } else {
            value = storage.getItem(name);
        }
        value = parseJSON(value);
        return Promise.resolve(value);
    }
}
Mlux.StoreManager.setStorageTool(storageTool);

function inject(Component,props) {
    Util.ready(function () {
        var placeholder = document.getElementById('react-placeholder');
        render(<Component {...props}/>, placeholder);
    });
}
export default {
    inject
}