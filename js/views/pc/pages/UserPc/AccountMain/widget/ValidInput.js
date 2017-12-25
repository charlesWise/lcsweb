import React,{ Component } from 'react';

import RegExp from './../../../../../../../js/util/RegExp';

var valid = true;

export default class ValidInput extends Component{
    constructor(...props) {
        super(...props);
        this.state = {
            errMsg: ''
        }
    }

    valid() {
        let val = this.refs.input.value || '';
        let type = this.props.validType || '';
        let validFunc = this.props.validFunc;
        if (!val) {
            valid = false;
            this.setState({
                errMsg: this.props.notNullMsg || this.props.placeholder
            })
            return valid;
        }else{
            if (type) {
                valid = this._testByRegExp(type, val)
                if (!valid) {
                    this.setState({
                        errMsg: this.props.errMsg || this.props.placeholder
                    })
                    return valid;
                }
            }
            if (validFunc){
                let errMsg = validFunc();
                valid = !errMsg;
                if (!valid) {
                    this.setState({
                        errMsg: errMsg
                    })
                    return valid;
                }
            }
        }
        return valid;
    }

    value() {
        return this.refs.input.value || '';
    }

    _testByRegExp(type, value){
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

    render(){
        return (
            <p className={this.props.className || ''}>
                <label>{this.props.label}：</label>
                <input
                    ref='input'
                    type={this.props.type || "text"}
                    placeholder={this.props.placeholder || ''}
                    onBlur={this.valid.bind(this)}
                    onFocus={()=>{
                        this.setState({
                            errMsg: ''
                        })
                    }}/>
                { this.props.children }
                {this.state.errMsg && <em>{this.state.errMsg}</em>}
            </p>
        )
    }
}