'use strict'
//登录
import React from 'react';

export default class ForgetpwdSucc extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    render(){
        return (
            <div className="forget-succ">
                <div className="succ-txt">密码重置成功，请重新登陆</div>
                <div className="succ-btn">
                    <a href='/index.html'>返回首页</a>
                    <a href='/login.html'>前往登录</a>
                </div>
            </div>
        )
    }
}
