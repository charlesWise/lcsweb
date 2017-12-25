import React, { Component } from 'react';

export default class CheckBankCard extends Component {
    constructor(...props) {
        super(...props);
        this.state = {}
    }
    render() {
        let data = this.props.data || {};
        return (
            <div className="user-right">
                <div className="user-rg-cont">
                    <h3><span style={{ cursor: "pointer" }} onClick={this.props.selected && this.props.selected.bind(this, 14)}>我的银行卡</span> > 银行卡信息</h3>
                    <div className="AddCard" style={{ height: '150px' }}>
                        <div className="add-top">
                            <img src={`/images/userPc/bank/${data.bank_code}.png`} width="140" height="40" />
                            <span className="div-y">尾号{data.bank_account.substr(-4)} <em>储蓄卡</em></span>
                        </div>
                        <div className="add-bot">
                            <p>持卡人姓名：{data.account_holder}</p>
                            <p>身份证号：{data.person_id}</p>
                            <p>卡号：{data.bank_account}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}