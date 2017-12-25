'use strict'
//查看文件
import React from 'react';

import Http from './../../../../../controller/pcapi';
import Location from './../../../../../util/Location';

export default class ProDetailSider extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            backAmount: 0,
            moneyErr:''
        }
    }

    _doAction() {
        let fid = Location.queryString('fid') || 0;
        let amount = parseFloat(this.refs.amount.value, 10) * 10000;
        let name = this.refs.name.value || '';
        if (!fid || !amount || !name){
            this.setState({
                moneyErr: !!amount ? '' : '请输入预约金额',
                nameErr: !!name ? '' : '请输入姓名',
            })
            return;
        }
        Http.addToBookingOrder({
            fund_id: fid,
            amount: amount, 
            remark: '',
            investor_name: name,
            investor_person_id: '',
        }).success((data, next) => {
            window.Prompt.success('预约成功！', () => {
                this.refs.amount.value = '';
                this.refs.name.value = '';
            })
        }).error((data, next) => {
            window.Prompt.error(data.message)
        })
    }

    _getBackAmount(){
        let fid = Location.queryString('fid') || 0;
        let amount = parseFloat(this.refs.amount.value, 10) * 10000;
        if(!fid || !amount) return;
        Http.getBackAmount({
            fund_id: fid,
            amount: amount
        }).success((data, next)=>{
            this.setState({
                backAmount: data.data && data.data.amount || 0
            })
        })
    }

    render(){
        let detail = this.props.detailInfo || {}
        return <div className="detail-sider">
            <ul className="">
                <li>产品名称：<span className="pro-name">{detail.fund_type_str}-{detail.fund_name}</span></li>
                <li><label>预约金额</label>
                    <input ref='amount' className="" placeholder="请输入预约金额" maxLength="10" type="text" onChange={this._getBackAmount.bind(this)} onFocus={()=>{
                        this.setState({
                            moneyErr: ''
                        })
                    }}/>
                    <em className="pro-amount">万元</em>
                    <p className="pro-error">{
                        this.state.moneyErr ? '*' + this.state.moneyErr : ''
                    }</p>
                </li> 
                <li><label>客户姓名</label>
                    <input ref='name' className="" placeholder="请输入姓名" maxLength="10" type="text" onFocus={() => {
                        this.setState({
                            nameErr: ''
                        })
                    }}/>
                    <p className={this.state.nameErr?"pro-error":'dn'}>{
                        this.state.nameErr ? '*' + this.state.nameErr : ''
                    }</p>
                </li> 
                <li className="amount-color"><img src="/images/investPc/commision.png"/>佣金金额
                    <span className="fr"><em>{this.state.backAmount}</em>元</span>
                </li>
                <li><button className="detail-btn" onClick={this._doAction.bind(this)}>立即预约</button></li>
            </ul>
        </div>
    }
}
