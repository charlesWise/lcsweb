'use strict'
//合同申请
import React from 'react';
import Pages from './../../../pages/InvestPc/Plist/Pages';
import NewAddress from './NewAddress';

import Http from './../../../../../controller/pcapi';

import NoDate from './../../../../..//widget/NoDate';

export default class ApplyContract extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            list: [],
            addr: {},
            show: false
        }
    }

    componentDidMount() {
        this._getData()
    }

    _getDefaultAddr() {
        Http.getDefaultAddr({}).success((data, next) => {
            this.setState({
                addr: (data.data && data.data.info) || {}
            })
        })
    }

    _getList() {
        Http.getAddressList({}).success((data, next) => {
            this.setState({
                list: (data.data && data.data.rows) || []
            })
        })
    }

    _getData(){
        this._getDefaultAddr();
        this._getList();
    }

    _onEnd(){
        this.setState({
            aid: ''
        })
        this._getData()
        this.refs.addview.hide()
    }

    _doEdit(aid){
        this.setState({
            aid: aid
        })
        this.refs.addview.show()
    }

    _doApply() {
        Http.applyFundContract({
            fund_id: this.state.fid || '',
            address_id: this.state.addr.address_id || ''
        }).success((data, next)=>{
            window.Prompt.success('申请成功！')
        }).error((source, next) => {
            window.Prompt.error(source.message)
        })
    }

    _setDefault(id){
        Http.setDefaultAddress({
            address_id: id
        }).success((source, next) => {
            this._getData();
        }).error((source, next) => {
            window.Prompt.error(source.message)
        })
    }

    _delAddr(id) {
        Http.delAddress({
            address_id: id
        }).success((source, next) => {
            this._getData();
        }).error((source, next) => {
            window.Prompt.error(source.message)
        })
    }

    _handleInput() {
        let fund_name = this.refs.input.value;
        if (!fund_name) {
            this.setState({
                list: []
            })
            return;
        } else {
            this.setState({
                fund_name: fund_name
            })
        }
        Http.searchFund({
            fund_name: fund_name
        }).success((data, next) => {
            if (data.boolen == 1) {
                data = data.data || {}
                this.setState({
                    plist: data.rows || [],
                    show: true
                })
            }
        })
    }

    _check(data){
        this.refs.input.value = data.fund_name;
        this.setState({
            fid: data.fund_id || "",
            show: false
        })
    }

    render(){
        return (
            <div>
                <div className="contract_list">
                    <div className="contract_list_input">
                        <label>产品名称*</label>
                        <div className="contract_list_search">
                            <input ref='input' className="search-input active" placeholder="请输入产品名称" /*onChange={this._handleInput.bind(this)}*/ />
                            <i className="search-icon" onClick={this._handleInput.bind(this)}></i>

                            {
                                this.state.show && this.state.fund_name && this.state.plist.length < 1 &&
                                <ul>
                                    <li>
                                        <div className="search-item">暂无相关产品</div>
                                    </li>
                                </ul>
                            }

                            {
                                this.state.show && this.state.plist.length > 0 &&
                                <ul>
                                    {
                                        this.state.fund_name && this.state.plist && this.state.plist.length > 0 &&
                                        this.state.plist.map((item, index) => {
                                            return (
                                                <li key={index} onClick={this._check.bind(this, item)}>
                                                    <div className="search-item" style={{ color: '#000'}}>{item.fund_name}</div>
                                                </li>
                                            )
                                        })

                                    }
                                </ul>
                            }
                        </div>
                        <button onClick={() => { this.refs.addview.show() }}>+新增地址</button>
                    </div>
                    <div className="con_list_item">
                        <ul><li>收件人</li><li>区域</li><li>地址</li><li>邮编</li><li>电话/手机</li><li>操作</li></ul>
                        {
                            this.state.list && this.state.list.length > 0 ?
                            this.state.list.map((item, index) => {
                                return <ul key={index}>
                                    <li>{item.recipient}</li>
                                    <li>{item.province}{item.city}</li>
                                    <li>{item.address}</li>
                                    <li>{item.postal_code}</li>
                                    <li>{item.mobile}</li>
                                    <li><em className="moren" onClick={this._doEdit.bind(this, item.address_id)}>修改</em>  <em onClick={this._delAddr.bind(this, item.address_id)} >删除</em>{item.is_default == 1 ? <em>默认地址</em> : <em onClick={this._setDefault.bind(this, item.address_id)} >设为默认</em>}</li>
                                </ul>
                            })
                            :
                            <NoDate/>
                        }
                    </div>
                    <button onClick={this._doApply.bind(this)} className="contract-btn">合同申请</button>
                </div>
                <NewAddress
                    ref="addview"
                    aid={this.state.aid||''}
                    onEnd={this._onEnd.bind(this)}
                />
            </div>
        )
    }
}
