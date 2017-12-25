'use strict'
//修改提现密码
import React from 'react';

import Http from './../../../../../controller/pcapi';
import ValidCodeBtn from './widget/ValidCodeBtn';
import ValidInput from './widget/ValidInput';

export default class ModifyTxPwd extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    _sendMobileCode() {
        let mobileInput = this.refs.mobile;
        let mobile = mobileInput.value();

        let a = mobileInput.valid();

        if (!a) return;

        return Http.sendMobileCode({
            mobile: mobile,
            type: 'RESET_PAYPWD',
            typeName: '找回支付密码'
        })
    }

    _checkMobileCode() {
        let mobile = this.refs.mobile.value;
        let code = this.refs.mobileCode.value;
        if (!mobile || !code) return;

        Http.validateMobileCode({
            mobile: mobile,
            code: code,
            type: 'RESET_PAYPWD'
        }).success((data, next) => {
            if (data.boolen==1) {
            } else {
                alert(data.message)
            }
        })
    }

    _changePaypwd() {
        let mobileInput = this.refs.mobile;
        let mobile = mobileInput.value();
        let codeInput = this.refs.mobileCode;
        let code = codeInput.value();
        let paypwd1Input = this.refs.paypwd1;
        let paypwd1 = paypwd1Input.value();
        let paypwd2Input = this.refs.paypwd2;
        let paypwd2 = paypwd2Input.value();

        let a = mobileInput.valid();
        let b = codeInput.valid();
        let c = paypwd1Input.valid();
        let d = paypwd2Input.valid();

        if (!(a && b && c && d)) return;


        if (!mobile || !code || !paypwd1 || !paypwd2) return;


        Http.changePaypwd({
            mobile: mobile,
            code: code,
            paypwd1: paypwd1,
            paypwd2: paypwd2
        }).success((data, next) => {
            if (data.boolen == 1) {
                this.props.selected && this.props.selected(1)
            } else {
                alert(data.message)
            }
        })
    }

    _comparePwd() {
        let paypwd1Input = this.refs.paypwd1;
        let paypwd1 = paypwd1Input.value();
        let paypwd2Input = this.refs.paypwd2;
        let paypwd2 = paypwd2Input.value();
        if (!paypwd1 || !paypwd2) return;
        if (paypwd1 != paypwd2) return '两次密码不一致';
    }

    render(){
        return (
            <div className="user-right">
                <div className="user-rg-cont">
                    <h3><span style={{ cursor: "pointer" }} onClick={this.props.selected && this.props.selected.bind(this, 1)}>个人资料</span> > 修改提现密码</h3>
                    <div className="modify">
                        <ValidInput
                            ref='mobile'
                            label={'手机号码'}
                            placeholder="请输入手机号码"
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
                        <ValidInput
                            ref='paypwd1'
                            type='password'
                            label={'新提现密码'}
                            placeholder="请输入6位提现密码"
                            validType='txPwd'
                            errMsg="提现密码格式不正确"
                        />
                        <ValidInput
                            ref='paypwd2'
                            type='password'
                            label={'确认新提现密码'}
                            placeholder="请再次输入密码"
                            validType='txPwd'
                            errMsg="提现密码格式不正确"
                            validFunc={this._comparePwd.bind(this)}
                        />
                        <p><button onClick={this._changePaypwd.bind(this)}>提交认证</button></p>
                    </div>
                </div>
            </div>
        )
    }
}
