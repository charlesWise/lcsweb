import React, { Component } from 'react';

import RegExp from './../../util/RegExp';

var valid = true;

export default class ValidInput extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            errMsg: '',
            hasValid: false
        }
    }

    valid() {
        if(!this.props.abortValid){
            this.setState({
                hasValid: true
            })
            let val = this.refs.input.value || '';
            let type = this.props.validType || '';
            let validFunc = this.props.validFunc;
            if (!val) {
                valid = false;
                this.setState({
                    errMsg: this.props.notNullMsg || this.props.placeholder
                })
                return valid;
            } else {
                if (type) {
                    valid = this._testByRegExp(type, val)
                    if (!valid) {
                        this.setState({
                            errMsg: this.props.errMsg || this.props.placeholder
                        })
                        return valid;
                    }
                }
                if (validFunc) {
                    let result = validFunc();
                    if (result instanceof Promise){
                        return result.then((errMsg) => {
                            valid = !errMsg;
                            if (!valid) {
                                this.setState({
                                    errMsg: errMsg
                                })
                            }
                            return valid;
                        })
                    }else{
                        let errMsg = result;
                        valid = !errMsg;
                        if (!valid) {
                            this.setState({
                                errMsg: errMsg
                            })
                            return valid;
                        }
                    }
                }
            }
        }
        return valid;
    }

    value() {
        return this.refs.input.value || '';
    }

    _testByRegExp(type, value) {
        let flag = true;
        switch (type) {
            case 'phone':
                flag = RegExp.testPhone(value);
                break;
            case 'code':
                flag = RegExp.testCode(value);
                break;
            case 'pwd':
                flag = RegExp.testPassword(value);
                break;
            case 'name':
                flag = RegExp.testName(value);
                break;
            case 'addr':
                flag = RegExp.testAddress(value);
                break;
            case 'id':
                flag = RegExp.testId(value);
                break;
            case 'txPwd':
                flag = RegExp.testTxPwd(value);
                break;
            default:
                break;
        }
        return flag;
    }

    render() { 
        return (
            <li className="form-group">
                <label>{this.props.label}</label>
                <input
                    ref='input'
                    type={this.props.type || "text"}
                    placeholder={this.props.placeholder || ''}
                    onBlur={this.valid.bind(this)}
                    onFocus={() => {
                        this.setState({
                            errMsg: '',
                            hasValid: false
                        })
                    }} />
                {
                    this.props.children
                }
                {
                    // 正确的勾勾
                    (this.state.hasValid && !!!this.state.errMsg) && <i className="tips-check" style={!!this.props.children ? { right: 125 + 'px'} : {}}/>
                }
                {
                    //校验的错误消息
                    <p className="tips-inner">
                        {
                            (this.state.hasValid && !!this.state.errMsg) &&
                            <span><i className="tips02" />{this.state.errMsg}</span>
                        }
                    </p>
                    // <p className="tips-inner tips-org"><span><i className="tips01"></i>号码已注册，<em>找回账号？</em></span></p>
                }
            </li>
        )
    }
}
