'use strict'
//新增地址
import React from 'react';

import Http from './../../../../../controller/pcapi';
import AreaSelectOne from './widget/AreaSelectOne';

export default class NewAddress extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {
            show: false,
            is_default: true
        }
    }

    hide() {
        this.setState({
            show: false
        })
    }

    show() {
        this.setState({
            show: true
        })
    }

    _addAddress() {
        let province = this.refs.AreaSelect.getProvince();
        let city = this.refs.AreaSelect.getCity();
        let recipient = this.refs.recipient.value;
        let mobile = this.refs.mobile.value;
        let pcode = this.refs.pcode.value;
        let address = this.refs.address.value;

        if (!city.name || !province.name || !recipient || !mobile || !pcode || !address) return;

        Http.editAddress({
            address_id: this.props.aid || '',
            recipient: recipient,
            mobile: mobile,
            province: province.name,
            city: city.name,
            address: address,
            postal_code: pcode,
            is_default: this.state.is_default ? 1 : 0
        }).success((data, next) => {
            if (data.boolen) {
                this.hide();
                this.props.onEnd && this.props.onEnd()
            }
        })
    }

    render() {
        if (!this.state.show) return null;
        return (
            <div>
                <div className="mask" onClick={() => { this.hide() }}></div>
                <div className="new-add">
                    <a className="closed" onClick={() => { this.hide() }}></a>
                    <ul>
                        <li>
                            <label>收件人*</label><input ref='recipient' type="text" placeholder="请输入收件人姓名" />
                        </li>
                        <li className="no-mar">
                            <label>手机号码*</label><input ref='mobile' type="text" placeholder="请输入收件人手机号码" />
                        </li>
                        <li className="new-region">
                            <label>区域*</label>
                            <AreaSelectOne ref="AreaSelect" />
                        </li>
                        <li>
                            <label>邮政编码*</label><input ref='pcode'type="text" placeholder="如不清楚，可填写000000" />
                        </li>
                        <li className="new-region">
                            <label>地址*</label><textarea ref='address' type="text" placeholder="请填写详细地址" />
                        </li>
                        <li className="mrdz">
                            <i onClick={() => {
                                this.setState({
                                    is_default: !this.state.is_default
                                })
                            }} className={this.state.is_default ? "active" : ''}></i>设置为默认收货地址
                        </li>
                        <li className="modify">
                            <button onClick={this._addAddress.bind(this)}>保存</button>
                        </li>
                    </ul>

                </div>
            </div>
        )
    }
}
