'use strict'
//暂无相关数据
import React from 'react';

export default class Prompt extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            show: false,
            status: 'error',
            msg: ''
        }
        this.cb = null;
    }

    componentDidMount() {
        window.Prompt = this;
    }

    success(msg,cb) {
        this.cb = cb;
        this.setState({
            status: 'success',
            msg: msg,
            show: true
        })
    }

    error(msg, cb) {
        this.cb = cb;
        this.setState({
            status: 'error',
            msg: msg,
            show: true
        })
    }

    _close() {
        this.cb && this.cb();
        this.setState({
            status: 'error',
            msg: '',
            show: false
        })
    }

    render(){
        return (
            <div style={this.state.show ? { display: 'block' } : { display: 'none' }} /*onClick={this._close.bind(this)}*/>
                <div className="mask"></div>
                <div className="Prompt">
                    <img src={this.state.status == 'error' ? "/images/userPc/fail.png" : "/images/userPc/success.png"}/>
                    <p>{this.state.msg}</p>
                    <div>
                        <a href="javascript:;" onClick={this._close.bind(this)}>好的</a>
                    </div>
                </div>
            </div>
        )
    }
}

AppRegister.registerById(<Prompt />,'react-prompt');
