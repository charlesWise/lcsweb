import React, { Component } from 'react';
import Pages from './../../../pages/InvestPc/Plist/Pages';

import Http from './../../../../../controller/pcapi';

export default class ApplyRecord extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            list: [],
            addr: []
        }
    }

    componentDidMount() {
        this._getList();
        this._getAddress();
    }

    _getAddress() {
        Http.getBackAddress({}).success((data, next) => {
            this.setState({
                addr: (data.data && data.data.info) || []
            })
        })
    }
    
    _getList(){
        Http.fundContractList({}).success((data, next)=>{
            this.setState({
                list: (data.data && data.data.rows) || []
            })
        })
    }

    render(){
        return (
            <div className="contract_list">
                <div className="contract_list_top"><i></i>*{this.state.addr[0] && this.state.addr[0]['key'] || ''}{this.state.addr[0] && this.state.addr[0]['value'] || ''} <span><i></i>{this.state.addr[1] && this.state.addr[1]['key'] || ''}{this.state.addr[1] && this.state.addr[1]['value'] || ''}</span></div>
                <div className="con_list_item">
                    <ul><li>产品类型</li><li>产品名称</li><li>专属经理</li><li>联系电话</li><li>合同状态</li><li>时间</li></ul>
                    {
                        this.state.list && this.state.list.length > 0 &&
                        this.state.list.map((item, index)=> {
                            return (
                                <ul key={index}>
                                    <li>{item.fund_type_str}</li>
                                    <li>{item.fund_name.slice(0, 13)}</li>
                                    <li>{item.manager}</li>
                                    <li>{item.phone}</li>
                                    <li>{item.status_str}</li>
                                    <li>{item.time}</li>
                                </ul>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}