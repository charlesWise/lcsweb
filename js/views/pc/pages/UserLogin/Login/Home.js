'use strict'
import React from 'react';
import LoginHead from './LoginHead';
import Login from './Login';
import LoginFoot from './LoginFoot';

class Index extends React.Component{
    constructor(...props){
        super(...props);
    }
    render(){
        return (
            <div className="login-wrap">
                <LoginHead />
                <Login />
                <LoginFoot />
            </div>
        )
    }
}

AppRegister.register(<Index />);