'use strict'
//登录
import React from 'react';
import ForgetpwdOne from './ForgetpwdOne';
import ForgetpwdTwo from './ForgetpwdTwo';
import ForgetpwdSucc from './ForgetpwdSucc';
import ValidInput from './../../../../../widget/ValidInput'

export default class Forgetpwd extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            step: 1,
            mobile: '',
            image_code: '',
            code: '',
        }
    }

    _onSuccess(obj) {
        this.setState({
            step: obj.step,
            mobile: obj.mobile || '',
            image_code: obj.image_code || '',
            code: obj.code || ''
        })
    }

    getVals() {
        return {
            mobile: this.state.mobile,
            image_code: this.state.image_code,
            code: this.state.code
        }
    }

    render(){
        return (
            <div className="forget-mains">
                <ul className="state-wrap">
                    <li className="state-item active">
                        <div className="state-item-num">
                            <img src={this.state.step < 2 ? "/images/userLogin/pd-state02.png" : "/images/userLogin/pd-state01.png"} />
                            <span className={this.state.step > 1 ? "state-progress active" : "state-progress"} />
                        </div>
                        <div className="state-item-title">
                            <p>01 验证身份</p>
                        </div>
                    </li>
                    <li className="state-item active">
                        <div className="state-item-num">
                            <img src={this.state.step < 2 ? "/images/userLogin/pd-state03.png" : (this.state.step == 2 ? "/images/userLogin/pd-state04.png" : "/images/userLogin/pd-state05.png")} />
                            <span className={this.state.step > 2 ? "state-progress active" : "state-progress"} />
                        </div>
                        <div className="state-item-title">
                            <p>02 重置登录密码</p>
                        </div>
                    </li>
                    <li className="state-item">
                        <div className="state-item-num">
                            <img src={this.state.step < 3 ? "/images/userLogin/pd-state06.png" : "/images/userLogin/pd-state07.png"} />
                        </div>
                        <div className="state-item-title">
                            <p>03 重置成功</p>
                        </div>
                    </li>
                </ul>
                {this.state.step == 1 && <ForgetpwdOne parent={this} onSuccess={this._onSuccess.bind(this)} />}
                {this.state.step == 2 && <ForgetpwdTwo parent={this} onSuccess={this._onSuccess.bind(this)}  />}
                {this.state.step == 3 && <ForgetpwdSucc parent={this} onSuccess={this._onSuccess.bind(this)}  />}
            </div>
        )
    }
}
