'use strict'
//注册head
import React from 'react';

export default class RegisterHead extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    render(){
        return (
            <div className="login-head">
                <div className="lg-head-info">
                    <div className="logo">
                        <img src="/images/index/logo.png" /><em>欢迎注册</em>
                    </div>
                    <div className="lg-dl">已有账号，<a href="/login.html">请登录</a></div>
                </div>
            </div>
        )
    }
}
