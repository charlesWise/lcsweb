'use strict'
//注册成功
import React from 'react';

export default class RegisterSucc extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    render(){
        return (
            <div className="forget-succ">
                <div className="succ-txt textl">
                    <p>恭喜您，注册成功！</p>
                    <p className="p1">账号已登录，快去职业认证吧~</p></div>
                <div className="succ-btn">
                    <a href='/index.html'>返回首页</a>
                    <a href='/accountcenter.html?type=7'>职业认证</a>
                </div>
            </div>
        )
    }
}
