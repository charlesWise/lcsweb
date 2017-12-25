'use strict'
//登录head
import React from 'react';

export default class ForgetpwdHead extends React.Component {
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
                        <img src="/images/index/logo.png" /><em>找回密码</em>
                    </div>
                    <a href='/index.html' className="lg-return"><i></i>返回首页</a>
                </div>
            </div>
        )
    }
}
