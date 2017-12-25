'use strict'
//修改姓名
import React from 'react';

import Http from './../../../../../controller/pcapi';
import ValidInput from './widget/ValidInput';

export default class ModifyName extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    _idSubmit() {
        let unameInput = this.refs.uname;
        let uname = unameInput.value();
        let idNoInput = this.refs.idNo;
        let idno = idNoInput.value();

        let a = unameInput.valid()
        let b = idNoInput.valid()

        if (!(a && b)) return;

        Http.modifyPerson({
            uname: uname,
            person_id: idno
        }).success((data, next) => {
            window.Prompt.success('修改成功！', () => {
                this.props.selected && this.props.selected(1)
            })
        }).error((data, next) => {
            window.Prompt.error(data.message)
        })
    }

    render(){
        return (
            <div className="user-right">
                <div className="user-rg-cont">
                    <h3><span style={{ cursor: "pointer" }} onClick={this.props.selected && this.props.selected.bind(this, 1)}>个人资料</span> > 身份认证</h3>
                    <div className="modify">
                        <ValidInput
                            ref='uname'
                            label={'姓名'}
                            placeholder="请输入您的真实姓名"
                            validType='name'
                            errMsg="姓名格式不正确"
                        />
                        <ValidInput
                            ref='idNo'
                            label={'身份认证'}
                            placeholder="请输入您的身份证号码"
                            validType='id'
                            errMsg="身份证格式不正确"
                        />
                        <p><button onClick={this._idSubmit.bind(this)}>提交认证</button></p>
                    </div>
                </div>
            </div>
        )
    }
}
