import React, { Component } from 'react';
import ValidInput from './../../../../../widget/ValidInput';
import ValidCodeBtn from './../../../../../widget/ValidCodeBtn';
import ValidImg from './../../../../../widget/ValidImg';

import Http from './../../../../../controller/pcapi';
import api from './../../../../../res/api';

export default class ForgetpwdOne extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            ts: Date.now()
        }
    }

    _onNext() {

        function promiseOrReturn(value, callback) {
            if (value && value instanceof Promise) {
                value.then(callback);
            } else {
                callback(value)
            }
        }

        let validCount = 0;
        let validArray = [];
        let result = true;
        let callback = (value) => {
            validCount++;
            result = result && value;
            if (validCount == validArray.length && result) {
                Http.findPasswordCheck({
                    mobile: mobile,
                    image_code: image_code,
                    code: code
                }).success((source, next) => {
                    this.props.onSuccess && this.props.onSuccess({
                        step: 2,
                        mobile: mobile,
                        image_code: image_code,
                        code: code
                    })
                }).error((source, next) => {
                    window.prompt.error(source.message)
                })
            }
        }

        let mobileInput = this.refs.mobile;
        let mobile = mobileInput.value();

        let imgInput = this.refs.imgCode;
        let image_code = imgInput.value();

        let codeInput = this.refs.mobileCode;
        let code = codeInput.value();

        let a = mobileInput.valid();
        let b = imgInput.valid();
        let c = codeInput.valid();

        // if (!(a && b && c)) return;

        // Http.findPasswordCheck({
        //     mobile: mobile,
        //     image_code: image_code,
        //     code: code
        // }).success((source, next) => {
        //     this.props.onSuccess && this.props.onSuccess({
        //         step: 2,
        //         mobile: mobile,
        //         image_code: image_code,
        //         code: code
        //     })
        // }).error((source, next)=>{
        //     window.prompt.error(source.message)
        // })

        validArray = [a, b, c];

        validArray.forEach((v) => promiseOrReturn(v, callback));
    }

    _updateImg() {
        this.setState({
            ts: Date.now()
        })
    }

    _sendMobileCode() {
        let mobileInput = this.refs.mobile;
        let mobile = mobileInput.value();

        let imgInput = this.refs.imgCode;

        let a = mobileInput.valid();
        let b = imgInput.valid();

        if (!(a && b)) return;

        return Http.sendMobileCode({
            mobile: mobile,
            type: 'FORGETPWD',
            typeName: '忘记密码'
        })
    }

    _checkMobileCode() {
        let mobile = this.refs.mobile.value();
        let code = this.refs.mobileCode.value();
        return new Promise((resolve, reject) => {
            Http.validateMobileCode({
                mobile: mobile,
                code: code,
                type: 'FORGETPWD'
            }).success(() => {
                resolve('')
            }).error((data, next) => {
                resolve(data.message)
            })
        })
    }

    render(){
        return (
            <form className='fgt-form'>
                <ul>
                    <ValidInput 
                        ref='mobile'
                        label='手机号码'
                        placeholder="请输入手机号码"
                        validType='phone'
                        errMsg="手机号码格式不正确"
                    />
                    <ValidInput
                        ref='imgCode'
                        label='验证码'
                        placeholder="请输入验证码"
                    >
                        <ValidImg url={'/api'+api.getCaptchaImage} ts={this.state.ts} keyType='validCode' onClick={this._updateImg.bind(this)} />
                    </ValidInput>
                    <ValidInput
                        ref='mobileCode'
                        label='手机验证码'
                        placeholder="请输入手机验证码"
                        validType='code'
                        errMsg="手机验证码格式不正确"
                        validFunc={this._checkMobileCode.bind(this)}
                    >
                        <ValidCodeBtn onClick={this._sendMobileCode.bind(this)}/>
                    </ValidInput>
                    <li className="form-group">
                        <button type="button" className="btn-orange" onClick={this._onNext.bind(this)}>下一步</button>
                    </li>
                </ul>
            </form>
        )
    }
}