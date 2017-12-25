import React from 'react';

import Http from './../../../../../../controller/pcapi';
import ListItem from './ListItem';
import StatusTabs from './StatusTabs';
import Pages from './../../../../pages/InvestPc/Plist/Pages';
import NoDate from './../../../../../../widget/NoDate'

export default class OrderList extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {
            status: 0,// 0：全部，1：预约中，69：待报单，7：审核中，3：待结算，5：已结算，48：失败
            list: [],
            totalPage: 0
        }
    }

    componentDidMount() {
        this._getOrder();
    }

    _getOrder(page_no = 1) {
        Http.bookingOrder({
            page_no: page_no,
            status: this.state.status
        }).success((data, next) => {
            this.setState({
                list: (data.data && data.data.rows) || [],
                totalPage: (data.data && data.data.page_count) || 0,
            })
        })
    }

    _onTabClick(status){
        this.setState({
            status: status
        })
        this.state.status = status;
        this._getOrder();
    }

    render(){
        var self = this;
        return (
            <div className="order-list">
                <StatusTabs onClick={this._onTabClick.bind(this)} />
                {
                    this.state.list && this.state.list.length > 0 ?
                    this.state.list.map((item,index)=>{
                        return <ListItem parent={self} key={index} data={item}/>
                    })
                    :
                    <NoDate/>
                }
                <Pages key={this.state.status} totalPage={this.state.totalPage} onClick={this._getOrder.bind(this)}/>
            </div>
        )
    }
}