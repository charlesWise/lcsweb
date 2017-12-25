import React from 'react';

export default class ListItem extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {}
    }

    _baodan(id){
        this.props.parent.props.parent.props.selected && this.props.parent.props.parent.props.selected(19, { id: id })
    }

    render() {
        let rowData = this.props.data || {};
        return (
            <div className="order-item">
                <h4 className="order-number">
                    订单编号：{rowData.order_no || ''} <span>{rowData.time || ''}</span>
                </h4>
                <h6 className="order-name"><em className="txt01">{rowData.fund_type_str || ''}</em> {rowData.fund_name || ''} <em className={rowData.status == 5 ? "txt03" : "txt02"}>{rowData.status_str}</em></h6>
                <ul className="order-item-info">
                    <li className="order-item-role role1">
                        <p className="txt_1 orange">{rowData.rake_back_account||0}元</p>
                        <p className="txt_2">前端佣金</p>
                    </li>
                    {
                        rowData.status == 5 && parseFloat(rowData.trail_amount) > 0 &&
                        <li className="order-item-role role1">
                            <p className="txt_1 orange">{rowData.trail_amount || 0}元</p>
                            <p className="txt_2">后端佣金</p>
                        </li>
                    }
                    <li className="order-item-role">
                        <p className="txt_1">{rowData.investor_name||''}</p>
                        <p className="txt_2">投资人</p>
                    </li>
                    <li className="order-item-role">
                        <p className="txt_1"> {rowData.amount||0}万 </p>
                        <p className="txt_2">投资金额</p>
                    </li>
                    {
                        (rowData.status == 6 || rowData.status == 9) &&
                        <li className="order-item-btn" onClick={this._baodan.bind(this, rowData.order_id)}><a href="javascript:;" className="button-pro active">立即报单</a></li>
                    }
                </ul>
            </div>
        )
    }
}