import React, {Component} from 'react';
import RegisterRight from "./RegisterRight";
import ValidInput from './../../../../../widget/ValidInput';
import ValidCodeBtn from './../../../../../widget/ValidCodeBtn';
import ValidImg from './../../../../../widget/ValidImg';

import Http from './../../../../../controller/pcapi';
import api from './../../../../../res/api';

export default class RegisterOne extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            isChecked: true,
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
            result = result&&value;
            console.log(validArray.length, validCount, result)
            if (validCount == validArray.length && result) {
                this.props.onSuccess && this.props.onSuccess({
                    step: 2,
                    mobile: mobile,
                    password: rpwd,
                    code: code,
                    imgCode: imgCode
                })
            }
        }

        let mobileInput = this.refs.mobile;
        let mobile = mobileInput.value();

        let codeInput = this.refs.mobileCode;
        let code = codeInput.value();

        let npwdInput = this.refs.npwd;
        let npwd = npwdInput.value();

        let rpwdInput = this.refs.rpwd;
        let rpwd = rpwdInput.value();

        let imgInput = this.refs.imgCode;
        let imgCode = imgInput.value();

        let a = mobileInput.valid();
        let b = codeInput.valid();
        let c = npwdInput.valid();
        let d = rpwdInput.valid();
        let e = imgInput.valid();

        // if (!(a && b && c && d && e && this.state.isChecked)) return;

        // this.props.onSuccess && this.props.onSuccess({
        //     step: 2,
        //     mobile: mobile,
        //     password: rpwd,
        //     code: code,
        //     imgCode: imgCode
        // })

        let f = this.state.isChecked;

        validArray = [a, b, c, d, e , f];

        validArray.forEach((v) => promiseOrReturn(v, callback));
    }

    _sendMobileCode() {
        let mobileInput = this.refs.mobile;
        let mobile = mobileInput.value();

        let a = mobileInput.valid();

        if (!a) return;

        return Http.sendMobileCode({
            mobile: mobile,
            type: 'REGISTER',
            typeName: '注册'
        })
    }

    _checkRegMobile() {
        let mobile = this.refs.mobile.value();
        if (!mobile) return;
        Http.checkRegMobile({
            mobile: mobile
        }).success(() => { })
    }

    _checkMobileCode() {
        let mobile = this.refs.mobile.value();
        let code = this.refs.mobileCode.value();
        // let msg = null;
        // if (!mobile || !code) return;
        // Http.validateMobileCode({
        //     mobile: mobile,
        //     code: code,
        //     type: 'REGISTER'
        // }).success(() => {
        // }).error((data,next)=>{
        //     msg = data.message;
        // })
        // return msg;
        return new Promise((resolve, reject) => {
            Http.validateMobileCode({
                mobile: mobile,
                code: code,
                type: 'REGISTER'
            }).success(() => {
                resolve('')
            }).error((data, next) => {
                resolve(data.message)
            })
        })
    }

    _checkAuthCode() {
        let imgInput = this.refs.imgCode;
        let imgCode = imgInput.value();
        // let msg = null;
        // if (!imgCode) return;
        // Http.checkAuthCode({
        //     authCode: imgCode
        // }).success(() => {
        // }).error((data, next) => {
        //     msg = data.message;
        // })
        // return msg;

        return new Promise((resolve, reject) => {
            Http.checkAuthCode({
                authCode: imgCode
            }).success(() => {
                resolve('')
            }).error((data, next) => {
                resolve(data.message)
            })
        })
    }

    _comparePwd() {
        let npwdInput = this.refs.npwd;
        let npwd = npwdInput.value();
        let rpwdInput = this.refs.rpwd;
        let rpwd = rpwdInput.value();
        if (!npwd || !rpwd) return;
        if (npwd != rpwd) return '两次密码不一致';
    }

    _updateImg(){
        this.setState({
            ts: Date.now()
        })
    }

    render (){
        return (
            <div className="reg-wrapper">
                <form className="reg-l">
                    <ul>
                        <ValidInput
                            ref='mobile'
                            label='手机号码'
                            placeholder="请输入手机号码"
                            validType='phone'
                            errMsg="手机号码格式不正确"
                        />

                        <ValidInput
                            ref='npwd'
                            type='password'
                            label={'新密码'}
                            placeholder="8-20个字符，请使用字母加数字的组合密码"
                            validType='pwd'
                            errMsg="新密码格式不正确"
                            notNullMsg="请输入新密码"
                        />

                        <ValidInput
                            ref='rpwd'
                            type='password'
                            label={'确认密码'}
                            placeholder="请确认新密码"
                            validType='pwd'
                            errMsg="确认密码格式不正确"
                            validFunc={this._comparePwd.bind(this)}
                        />

                        {
                            <ValidInput
                                ref='imgCode'
                                label='验证码'
                                placeholder="请输入验证码"
                                validFunc={this._checkAuthCode.bind(this)}
                            >
                                <ValidImg url={'/api'+api.getCaptchaImage} ts={this.state.ts} keyType='validCode' onClick={this._updateImg.bind(this)} />
                            </ValidInput>
                        }
                        <ValidInput
                            ref='mobileCode'
                            label='手机验证码'
                            placeholder="请输入手机验证码"
                            validType='code'
                            errMsg="手机验证码格式不正确"
                            validFunc={this._checkMobileCode.bind(this)}
                        >
                            <ValidCodeBtn onClick={this._sendMobileCode.bind(this)} />
                        </ValidInput>

                        <li className="form-check"><i onClick={()=>{
                            this.setState({
                                isChecked: !this.state.isChecked
                            })
                        }} className={this.state.isChecked ? "hook-check active" : "hook-check"} />我已阅读并同意<em><a href="/protocol.html" target='_blank'>《长富云理财师服务协议》</a></em>
                            {!this.state.isChecked && <p className="tips-inner"><span><i className="tips02"/>请阅读《长富云理财师服务协议》</span></p>}
                        </li>
                        <li className="form-group">
                            <button type="button" className="btn-orange" onClick={this._onNext.bind(this)}>下一步</button>
                        </li>
                    </ul>
                </form>
                <RegisterRight />
            </div>
        )
    }
}