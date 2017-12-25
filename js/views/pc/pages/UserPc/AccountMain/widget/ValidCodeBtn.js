import React, { Component } from 'react';

const COUNT_TIME = 60;

export default class ValidCodeBtn extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            text: '获取验证码',
            isInvertal: false
        }
        this.timer = null;
        this.countTime = COUNT_TIME;
    }

    _onClick() {
        if (this.state.isInvertal) return;
        this._send();
    }

    _send() {
        let result = this.props.onClick && this.props.onClick() || {};
        result.success && result.success((source, next) => {
            this._countDown();
        }).fail((source, next) => {
        //错误信息
            window.Prompt.error(source.message)
        }).error((source, next) => {
            //错误信息
            window.Prompt.error(source.message)
        })
    }

    _countDown() {
        this.state.isInvertal = true;
        this.timer = setInterval(() => {
            if (this.countTime < 1) {
                this._reset();
            } else {
                this.setState({
                    text: this.countTime--
                })
            }
        }, 1000)
    }

    _clearInterval() {
        if (this.timer)
            clearInterval(this.timer);
    }

    _reset() {
        this._clearInterval();
        this.timer = null;
        this.countTime = COUNT_TIME;
        this.state.isInvertal = false;
        this.state.text = '获取验证码';
        this.forceUpdate();
    }

    render() {
        return (
            <button style={{marginRight: 0}} onClick={this._onClick.bind(this)}>{this.state.text}</button>
        );
    }
}