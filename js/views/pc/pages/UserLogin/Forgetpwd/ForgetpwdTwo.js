'use strict'
//登录
import React from 'react';
import ValidInput from './../../../../../widget/ValidInput';

import Http from './../../../../../controller/pcapi';

export default class ForgetpwdTwo extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    _onNext() {
        let vals = this.props.parent.getVals();
        let mobile =  vals.mobile;
        let image_code = vals.image_code;
        let code = vals.code;

        let npwdInput = this.refs.npwd;
        let npwd = npwdInput.value();
        let rpwdInput = this.refs.rpwd;
        let rpwd = rpwdInput.value();

        let a = npwdInput.valid();
        let b = rpwdInput.valid();

        if (!(a && b)) return;

        Http.findPasswordSave({
            mobile: mobile,
            image_code: image_code,
            code: code,
            new_password: npwd
        }).success((source, next) => {
            this.props.onSuccess && this.props.onSuccess({step:3})
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

    render(){
        return (
            <form className='fgt-form'>
                <ul>
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
                    <li className="form-group">
                        <button type="button" className="btn-orange" onClick={this._onNext.bind(this)}>下一步</button>
                    </li>
                </ul>
            </form>
        )
    }
}
