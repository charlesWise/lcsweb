'use strict'
//修改登陆密码
import React from 'react';

import Http from './../../../../../controller/pcapi';
import ValidInput from './widget/ValidInput';

export default class ModifyLoginPwd extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    _modifyPwd() {
        let opwdInput = this.refs.opwd;
        let opwd = opwdInput.value();
        let npwdInput = this.refs.npwd;
        let npwd = npwdInput.value();
        let rpwdInput = this.refs.rpwd;
        let rpwd = rpwdInput.value();

        let a = opwdInput.valid();
        let b = npwdInput.valid();
        let c = rpwdInput.valid();

        if (!(a && b && c)) return;

        Http.modifyPassword({
            old_password: opwd,
            new_password: npwd
        }).success((data, next) => {
            if (data.boolen == 1) {
                this.props.selected && this.props.selected(1)
            } else {
                alert(data.message)
            }
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
            <div className="user-right">
                <div className="user-rg-cont">
                    <h3><span style={{ cursor: "pointer" }} onClick={this.props.selected && this.props.selected.bind(this, 1)}>个人资料</span> > 修改登陆密码</h3>
                    <div className="modify">
                        <ValidInput
                            ref='opwd'
                            type='password'
                            label={'当前登录密码'}
                            placeholder="请输入您现在的登陆密码"
                        />
                        <ValidInput
                            ref='npwd'
                            type='password'
                            label={'新登录密码'}
                            placeholder="请输入8-20个字符，字母加数字的组合密码"
                            validType='pwd'
                            errMsg="密码格式不正确"
                        />
                        <ValidInput
                            ref='rpwd'
                            type='password'
                            label={'确认新登录密码'}
                            placeholder="请再次输入密码"
                            validType='pwd'
                            errMsg="密码格式不正确"
                            validFunc={this._comparePwd.bind(this)}
                        />
                        <p><button onClick={this._modifyPwd.bind(this)}>提交认证</button></p>
                    </div>
                </div>
            </div>
        )
    }
}
