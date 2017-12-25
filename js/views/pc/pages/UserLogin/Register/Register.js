'use strict'
//注册
import React from 'react';
import RegisterOne from './RegisterOne';
import RegisterTwo from './RegisterTwo';
import RegisterSucc from './RegisterSucc';

export default class Register extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {
            step: 1,
            mobile: '',
            password: '',
            code: '',
            imgCode: ''
        }
    }

    _onSuccess(obj) {
        this.setState({
            step: obj.step,
            mobile: obj.mobile || '',
            password: obj.password || '',
            code: obj.code || '',
            imgCode: obj.imgCode || ''
        })
    }

    getVals() {
        return {
            mobile: this.state.mobile || '',
            password: this.state.password || '',
            code: this.state.code || '',
            imgCode: this.state.imgCode || ''
        }
    }

    render() {
        return (
            <div className="forget-mains">
                <ul className="state-wrap">
                    <li className="state-item active">
                        <div className="state-item-num">
                            <img src={this.state.step < 2 ? "/images/userLogin/rg-state02.png" : "/images/userLogin/rg-state01.png"} />
                            <span className={this.state.step > 1 ? "state-progress active" : "state-progress"}/>
                        </div>
                        <div className="state-item-title">
                            <p>01 创建账号</p>
                        </div>
                    </li>
                    <li className="state-item active">
                        <div className="state-item-num">
                            <img src={this.state.step < 2 ? "/images/userLogin/rg-state03.png" : (this.state.step == 2 ? "/images/userLogin/rg-state04.png" : "/images/userLogin/rg-state05.png")} />
                            <span className={this.state.step > 2 ? "state-progress active" : "state-progress"} />
                        </div>
                        <div className="state-item-title">
                            <p>02 完善信息</p>
                        </div>
                    </li>
                    <li className="state-item">
                        <div className="state-item-num">
                            <img src={this.state.step < 3 ? "/images/userLogin/rg-state06.png" : "/images/userLogin/rg-state07.png"}/>
                        </div>
                        <div className="state-item-title">
                            <p>03 完成注册</p>
                        </div>
                    </li>
                </ul>

                {this.state.step == 1 && <RegisterOne parent={this} onSuccess={this._onSuccess.bind(this)} />}
                {this.state.step == 2 && <RegisterTwo parent={this} onSuccess={this._onSuccess.bind(this)} />}
                {this.state.step == 3 && <RegisterSucc parent={this} onSuccess={this._onSuccess.bind(this)} />}
            </div>
        )
    }
}
