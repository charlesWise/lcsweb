'use strict'
//银行卡
import React from 'react';

import Http from './../../../../../controller/pcapi';

export default class BankCard extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            bankList: [],
            loaded: false
        }
    }

    componentDidMount() {
        this._getBankCard();
    }
    
    _getBankCard() {
        Http.getBankList({}).success((data, next) => {
            if (data.boolen==1) {
                data = data.data || {}
                let bankList = data.rows || [];

                this.setState({
                    bankList: bankList,
                    loaded: true
                })
            } else {
                alert(data.message)
            }
        });
    }

    _onClick(index) {
        this.props.selected && this.props.selected(index)
    }

    _delBankcard(bank_id){
        Http.delBank({
            bank_id: bank_id
        }).success((data, next) => {
            this._getBankCard();
        }).error((data, next) => {
            alert(data.message)
        })
    }

    _check(data){
        this.props.selected && this.props.selected(21, data)
    }

    render(){
        let bankList = this.state.bankList || [];
        let slef = this;
        return (
            <div className="user-right">
                <div className="user-rg-cont">
                    <h3>我的银行卡</h3>
                    {
                        (bankList.length > 0 && this.state.loaded) &&
                        bankList.map((item, index)=>{
                            return (
                                <div key={index} className="AddCard" onClick={slef._check.bind(slef,item)}>
                                    <div className="add-top">
                                        <img src={`/images/userPc/bank/${this.state.bankList && this.state.bankList[0] && this.state.bankList[0].bank_code}.png`} width="140" height="40" />
                                        <span className="div-y">尾号{item.bank_account.substr(-4)} <em>储蓄卡</em></span>
                                    </div>
                                    <div className="add-bot">
                                        <p>持卡人姓名：{item.account_holder}</p>
                                        {/* <p>手机号：189****6031</p> */}
                                        <span onClick={this._delBankcard.bind(this, item.bank_id)}>删除</span>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {
                        (bankList.length < 1 && this.state.loaded) &&
                        <div className="AddCard">
                            <a onClick={this._onClick.bind(this, 15)} className="add-act"><i></i><em>添加银行卡</em></a>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
