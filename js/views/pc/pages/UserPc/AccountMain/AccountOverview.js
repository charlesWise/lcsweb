'use strict'
//账户总览
import React from 'react';

import Http from './../../../../../controller/pcapi';
import OrderList from './Order/OrderList'

export default class AccountOverview extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            status: 0,
            accountInfo: {},
            showEyes: true
        }
    }

    componentDidMount() {
        let isShow = localStorage.getItem('show_money');
        this.setState({
            showEyes: isShow ? (isShow == 1 ? true : false) : true
        })
        this._getAccountInfo();
    }

    _getAccountInfo() {
        Http.getAccountInfo({}).success((data, next)=>{
            let info = data.data && data.data.info;
            this.setState({
                accountInfo: info
            })
        })
    }

    _toggleEyes(){
        let showEyes = !this.state.showEyes;
        localStorage.setItem('show_money', (showEyes ? 1 : 0))
        this.setState({ showEyes: !this.state.showEyes })
    }

    render(){
        return (
            <div className="user-right">
                <div className="surplus">
                    <h3 className="surplus-see">账户余额 <span className={this.state.showEyes?"active":''} onClick={this._toggleEyes.bind(this)}></span></h3>
                    <ul>
                        <li>累计赚取佣金（元）
                        <p>{this.state.showEyes ? this.state.accountInfo.comm_all : '***'}</p>
                        </li>
                        <li>待结算佣金（元）
                        <p>{this.state.showEyes ? this.state.accountInfo.comm_will : '***'}</p>
                        </li>
                        <li>账户余额：{this.state.showEyes ? this.state.accountInfo.account_amount : '***'}元
                        <p className="tx-btn" onClick={() => { window.location.href ='/accountcenter.html?type=2' }}>提现</p>
                        </li>
                    </ul>
                </div>
                <div className="order-tit">
                    我的订单
                    <span><i></i>专属经理：{this.state.accountInfo.manager}</span>
                    <span><i></i>联系方式：{this.state.accountInfo.manager_phone}</span>
                </div>
                <OrderList parent={this}/>
            </div>
        )
    }
}
