'use strict'
//注册第二步
import React from 'react';
import RegisterRight from './RegisterRight';
import ValidInput from './../../../../../widget/ValidInput';
import ValidCodeBtn from './../../../../../widget/ValidCodeBtn';
import ValidImg from './../../../../../widget/ValidImg';
import ProvinceSelect from './../../../../../widget/ProvinceSelect';

import Http from './../../../../../controller/pcapi';
import api from './../../../../../res/api';

export default class RegisterTwo extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {
            province: '',
            city: ''
        }
    }

    _onNext() {
        let vals = this.props.parent.getVals();
        let mobile = vals.mobile;
        let code = vals.code;
        let password = vals.password;
        let imgCode = vals.imgCode;

        let unameInput = this.refs.uname;
        let uname = unameInput.value();

        let icodeInput = this.refs.icode;
        let icode = icodeInput.value();

        let selectInput = this.refs.ProvinceSelect;

        let province = selectInput.getProvince();
        let city = selectInput.getCity();

        let a = unameInput.valid();
        let b = icodeInput.valid();
        let c = selectInput.valid();

        if (!(a && b && c)) return;

        Http.pcRegister({
            mobile: mobile,
            code: code,
            password: password,
            province: province.name,
            city: city.name,
            from_client: 'pc',  // 从那个客户端过来， 1：pc，2：iphone，3：android，4：ipad，5：ipod，6：other，7：微信
            visit_code: icode,
            uname: uname,
            authCode: imgCode
        }).success((source, next) => {
            this.props.onSuccess && this.props.onSuccess({ step: 3 })
            localStorage.setItem('user_token', source.data.user_token || '')
        }).error((data, next)=>{
            alert(data.message)
        })
    }

    render() {
        return (
            <div className="reg-wrapper">
                <form className="reg-l">
                    <ul>
                        <ValidInput
                            ref='uname'
                            label={'姓名'}
                            placeholder="请输入您的真实姓名"
                            validType='name'
                            errMsg="姓名格式不正确"
                        />

                        <ProvinceSelect ref="ProvinceSelect"/>

                        <ValidInput
                            ref='icode'
                            label={'邀请码'}
                            placeholder="请输入邀请码"
                            abortValid={true}
                        />

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
