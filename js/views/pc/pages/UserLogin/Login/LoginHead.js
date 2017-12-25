'use strict'
//登录head
import React from 'react';

export default class LoginHead extends React.Component {
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
                        <img src="/images/index/logo.png" /><em>欢迎登录</em>
                    </div>
                    <a href='/index.html' className="lg-return"><i></i>返回首页</a>
                </div>
            </div>
        )
    }
}
