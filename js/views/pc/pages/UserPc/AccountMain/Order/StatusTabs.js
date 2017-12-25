import React, { Component } from 'react';

import Http from './../../../../../../controller/pcapi';

export default class StatusTabs extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            status: 0,// 0：全部，1：预约中，69：待报单，7：审核中，3：待结算，5：已结算，48：失败
            count: 0
        }
    }

    componentDidMount() {
        Http.orderNum({
            status: 69
        }).success((source, next)=>{
            this.setState({
                count: (source.data && source.data.count) || 0
            })
        })
    }
    

    _onClick(status){
        if(status == this.state.status) return;
        this.setState({
            status: status
        })
        this.props.onClick && this.props.onClick(status);
    }

    render(){
        return (
            <h3>
                <span className={this.state.status == 0 ? "active" : ""} onClick={this._onClick.bind(this,0)}>全部</span>
                <span className={this.state.status == 1 ? "active" : ""} onClick={this._onClick.bind(this,1)}>预约中</span>
                <span className={this.state.status == 69 ? "active" : ""} onClick={this._onClick.bind(this,69)}>待报单
                    {
                        this.state.count > 0 && 
                        <i>{this.state.count}</i>
                    }
                </span>
                <span className={this.state.status == 7 ? "active" : ""} onClick={this._onClick.bind(this,7)}>审核中</span>
                <span className={this.state.status == 3 ? "active" : ""} onClick={this._onClick.bind(this,3)}>待结算</span>
                <span className={this.state.status == 5 ? "active" : ""} onClick={this._onClick.bind(this,5)}>已结算</span>
                <span className={this.state.status == 48 ? "active" : ""} onClick={this._onClick.bind(this,48)}>失败</span>
            </h3>
        )
    }
}