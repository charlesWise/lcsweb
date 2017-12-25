'use strict'
//添加银行卡
import React from 'react';

import Http from './../../../../../controller/pcapi';

export default class AddCard extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {

        }
    }

    _addCard() {
        let bank = this.refs.bankInfo.bank || {};
        let bank_account = this.refs.bank_account.value;
        let account_holder = this.refs.account_holder.value;
        let person_id = this.refs.person_id.value;
        if (!bank.bank_code || !bank_account || !account_holder || !person_id) return;
        Http.addCard({
            bank_id: 0,
            bank_code: bank.bank_code,
            out_account_no: bank_account,
            real_name: account_holder,
            person_id: person_id,
            client_type: 'pc'
        }).success((data, next)=>{
            window.Prompt.success('添加成功！',()=>{
                this.props.selected && this.props.selected(14)
            })
        }).error((data, next)=>{
            window.Prompt.error(data.message)
        })
    }

    render() {
        return (
            <div className="user-right">
                <div className="user-rg-cont">
                    <h3><span style={{ cursor: "pointer" }} onClick={this.props.selected && this.props.selected.bind(this, 14)}>我的银行卡</span> > 添加银行卡</h3>
                    <div className="modify modify-add-card">
                        <p>
                            <label>姓名:</label>
                            <input ref='account_holder' type="text" className="width238" placeholder="请输入姓名" />
                        </p>
                        <p>
                            <label>身份证:</label>
                            <input ref='person_id' type="text" placeholder="请输入身份证号码" />
                        </p>
                        <p className="yinhang">
                            <label>银行:</label>
                            <PrettySelect ref='bankInfo'/>
                        </p>
                        <p>
                            <label>卡号:</label>
                            <input ref='bank_account' type="text" placeholder="请输入银行卡号" />
                        </p>
                        <p><button onClick={this._addCard.bind(this)}>提交认证</button>
                            <span>*单笔限额30万元，单日限额50万元，单月限额100万元</span>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

class PrettySelect extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {
            bank_code: '',
            bank_name: '',
            bankList: [],
            show: false
        };
        this.bank = {}
    }

    componentDidMount() {
        Http.getSelectBankList({}).success((data, next)=>{
            let bankList = data.data && data.data.rows;
            this.setState({
                bankList: bankList
            })
        })
    }

    _getBank(bank){
        this.bank = bank;
        this.setState({
            show: false,
            bank_code: bank.bank_code,
            bank_name: bank.bank_name,
        })
    }

    _getClassName() {
        if(this.state.show){
            return {
                arrow: 'pull',
                list: 'region'
            }
        }else{
            return {
                arrow: 'drop-down',
                list: 'region dn'
            }
        }
    }

    render() {
        let classNames = this._getClassName();
        return (
            <div className="select-region" style={{marginLeft: '20px'}}>
                <div className="sel-inner" onClick={()=>{
                    this.setState({
                        show: !this.state.show
                    })
                }}>
                    {this.state.bank_code ? this.state.bank_name : '请选择'} <i className={classNames.arrow}></i>
                </div>
                <div className={classNames.list}>
                    <ul>
                        {
                            this.state.bankList.map((item, index)=>{
                                return (
                                    <li key={index} onClick={this._getBank.bind(this, item)}>{item.bank_name}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
