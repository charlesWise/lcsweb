'use strict'
//修改手机号
import React from 'react';

import Http from './../../../../../controller/pcapi';
import ValidCodeBtn from './widget/ValidCodeBtn';
import ValidInput from './widget/ValidInput';

export default class ModifyPhone extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    _sendMobileCode() {
        let pwdInput = this.refs.loginPwd;
        let mobileInput = this.refs.mobile;
        let mobile = mobileInput.value();

        let a = pwdInput.valid();
        let b = mobileInput.valid();

        if (!(a && b)) return;
        
        return Http.sendMobileCode({
            mobile: mobile,
            type: 'EDIT_MOBILE',
            typeName: '修改手机号码'
        })
    }

    _checkMobileCode() {
        let mobile = this.refs.mobile.value;
        let code = this.refs.mobileCode.value;
        if (!mobile || !code) return;
        Http.validateMobileCode({
            mobile: mobile,
            code: code,
            type: 'EDIT_MOBILE'
        }).success((data, next) => {
            if (data.boolen) {
            } else {
                alert(data.message)
            }
        })
    }

    _onSubmit(){
        let pwdInput = this.refs.loginPwd;
        let loginPwd = pwdInput.value();
        let mobileInput = this.refs.mobile;
        let mobile = mobileInput.value();
        let codeInput = this.refs.mobileCode;
        let code = codeInput.value();

        let a = pwdInput.valid();
        let b = mobileInput.valid();
        let c = codeInput.valid();

        if (!(a && b && c)) return;

        Http.modifyMobile({
            new_mobile: mobile,
            code: code,
            pwd: loginPwd
        }).success((data, next) => {
            if (data.boolen == 1) {
                this.props.selected && this.props.selected(1)
            }
        }).error((data, next)=>{
            alert(data.message)
        })
    }

    render(){
        return (
            <div className="user-right">
                <div className="user-rg-cont">
                    <h3><span style={{ cursor: "pointer" }} onClick={this.props.selected && this.props.selected.bind(this, 1)}>个人资料</span> > 修改手机号</h3>
                    <div className="modify">
                        <ValidInput
                            ref='loginPwd'
                            type='password'
                            label={'登录密码'}
                            placeholder="请输入登录密码"
                        />
                        <ValidInput
                            ref='mobile'
                            label={'新手机号码'}
                            placeholder="请输入新手机号码"
                            validType='phone'
                            errMsg="手机号码格式不正确"
                        />
                        <ValidInput
                            className="modify-yzm"
                            ref='mobileCode'
                            label={'验证码'}
                            placeholder="请输入验证码"
                            // validType='code'
                            // errMsg="验证码格式不正确"
                        >
                            <ValidCodeBtn onClick={this._sendMobileCode.bind(this)} />
                        </ValidInput>
                        <p><button onClick={this._onSubmit.bind(this)}>提交认证</button></p>
                    </div>
                </div>
            </div>
        )
    }
}
