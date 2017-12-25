'use strict'
//登录
import React from 'react';
import Http from './../../../../../controller/pcapi';

export default class Login extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    componentDidMount() {
        let self = this;
        window.addEventListener('keydown',function(event){
            if (event && (event.keyCode == 13)){
                self._doLogin()
            }
        },false)
    }

    _doLogin() {
        let mobile = this.refs.mobile.value || ''
        let password = this.refs.password.value || ''
        if(!mobile || !password){
            let mobileMsg = !mobile ? '请输入手机号码' : ''
            let pwdMsg = !password ? '请输入密码' : ''
            this.setState({
                mobileMsg: mobileMsg,
                pwdMsg: pwdMsg
            })
            return;
        }
        Http.login({
            mobile: mobile,
            password: password
        }).success((source, next)=>{
            localStorage.setItem('user_token', source.data.user_token || '')
            location.href = '/accountcenter.html';
        }).error((source, next)=>{
            window.Prompt.error(source.message)
        })
    }

    render(){
        return (
            <div className="login-box-wrap">
                <div className="box-content_info">
                    <div className="login-content">
                        <form>
                            <p className="login-tit">账户登录</p>
                            <ul className="login-ul-box">
                                <li>
                                    <i className="lg-tel"></i>
                                    <input ref='mobile' className="lg-input" placeholder="请输入手机号码" maxLength="11" type="text" />
                                </li>
                                {
                                    !!this.state.mobileMsg &&
                                    <li className="li-error-show">*{this.state.mobileMsg}</li>
                                }
                                <li>
                                    <i className="lg-pwd"></i>
                                    <input ref='password' autoComplete="off" placeholder="请输入账户密码" className="lg-input" maxLength="20" type="password" />
                                </li>
                                {
                                    !!this.state.pwdMsg &&
                                    <li className="li-error-show">*{this.state.pwdMsg}</li>
                                }
                                {
                                    // <li>
                                    //     <i className="lg-yzm"></i>
                                    //     <input type="text" maxLength="4" placeholder="请输入验证码" className="lg-input yz-ipt" />
                                    //     <img src="code.png" className="code-img" />
                                    // </li>
                                    // <li className="li-error-show">*验证失败</li>
                                }
                                <li><button type="button" name="sub" className="login-btn" onClick={this._doLogin.bind(this)}>登 录</button></li>
                                <li className="last-child">
                                    <a href='/register.html' className="active">立即注册</a>
                                    <a href='/forgetpwd.html' className="">忘记密码</a>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
