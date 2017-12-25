'use strict'
//多条件筛选
import React from 'react';

import FilterList from './FilterList';
import FilterItem from './FilterItem';
import FilterTag from './FilterTag';
import Http from './../../../../../controller/pcapi';
import Location from './../../../../../util/Location';

var typeName = ['固收','证券基金','股权基金','集合信托','债权基金','资管计划'];

export default class SearchListTop extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            filter: {},
            labels: {},
            filterItem: [],
            fund_type: '', //1：固收，2：证券基金，3：股权基金，4：信托产品，5：债权基金，6：资管计划
            order_field: 1, //默认：1 、最新：2 、最热 3、佣金 4、收益 5、评级 6
            more: false
        }
    }


    componentDidMount() {
        let fund_type = Location.queryString('ftype') || ""
        this.setState({
            fund_type: fund_type
        })
        Http.pcSearchFields({
        }).success((source, next)=>{
            var data = source.data || [];
            this.setState({
                data: data
            });
        })
    }

    _renderFilterTag() {
        var data = this.state.filterItem || []
        var self = this;
        if (Object.keys(data).length < 1) return null;
        return data.map((item, index, array) => {
            let value = item.value;
            return (
                Object.keys(value).map((itm, i, arr) => {
                    return (
                        <FilterTag
                            key={i}
                            label={this.state.labels[item.field]}
                            name={value[itm].text}
                            onUnselected={() => {
                                self._removeItem(item.field, itm);
                                self.props.parent._removeItem(item.field, itm);
                            }} />
                    )
                })
            )
        })
    }

    _renderItems(data) {
        var self = this;
        return data.map((item, index, array)=>{
            let value = item.value;
            return (
                <FilterList key={index} label={item.text}>
                    {
                        Object.keys(value).map((itm, i, arr) => {
                            return (
                                <FilterItem
                                    key={i}
                                    label={value[itm].text}
                                    selected={self.props.parent.state.filter[item.field] && self.props.parent.state.filter[item.field][itm]}
                                    onSelected={() => {
                                        self._addItem(item.text,item.field, itm, value[itm]);
                                        self.props.parent._addItem(item.field, itm, value[itm]);
                                    }}
                                    onUnselected={() => {
                                        self._removeItem(item.field, itm);
                                        self.props.parent._removeItem(item.field, itm);
                                    }} />
                            )
                        })
                    }
                </FilterList>
            )
        })
    }

    _addItem(text, obj, key, value) {
        if (!this.state.filter[obj])
            this.state.filter[obj] = {};
        this.state.filter[obj][key] = value;
        if (!this.state.labels[obj])
            this.state.labels[obj] = {};
        this.state.labels[obj] = text;
        this._formatFilter(this.state.filter);
    }

    _removeItem(obj, key) {
        if (this.state.filter[obj])
            delete this.state.filter[obj][key];
        this._formatFilter(this.state.filter);
    }

    _formatFilter() {
        var data = Object.assign({}, this.state.filter);
        var items = [];
        Object.keys(data).map((key, index, arr) => {
            var item = {};
            item.field = key;
            item.value = data[key];
            items.push(item);
        })

        this.setState({
            filterItem: items
        })
    }

    _renderFilterType(){
        let name = typeName[this.state.fund_type-1];
        if(!name) return null;
        return (
            <FilterTag
                key={'typetag'}
                name={name}
                label={'产品'}
                onUnselected={() => {
                    this._typeUnselect()
                }} />
        )
    }

    _orderSelect(order){
        this.setState({
            order_field: order
        })
        this.props.parent._orderSelect(order);
    }

    _typeSelect(type){
        this.setState({
            fund_type: type
        })
        this.props.parent._typeSelect(type);
    }

    _typeUnselect() {
        this.setState({
            fund_type: ''
        })
        this.props.parent._typeUnselect();
    }

    render() {
        if (!this.state.data) return null;
        return (
            <div>
                {
                    !this.state.fund_type && 
                    <div className="transverse-menu">
                        <ul>
                            <li>产品</li>
                            <li onClick={this._typeSelect.bind(this, 4)} className={this.state.fund_type == 4 ? "active" : ""}>集合信托</li>
                            <li onClick={this._typeSelect.bind(this, 6)} className={this.state.fund_type == 6 ? "active" : ""}>资管计划</li>
                            <li onClick={this._typeSelect.bind(this, 5)} className={this.state.fund_type == 5 ? "active" : ""}>债权基金</li>
                            <li onClick={this._typeSelect.bind(this, 3)} className={this.state.fund_type == 3 ? "active" : ""}>股权基金</li>
                            <li onClick={this._typeSelect.bind(this, 2)} className={this.state.fund_type == 2 ? "active" : ""}>证券基金</li>
                        </ul>
                    </div>
                }
                <div className="search-list-top">
                    <em>全部结果></em>
                    <div className="tags">
                        {
                            this._renderFilterTag()
                        }
                        {
                            this._renderFilterType()
                        }
                    </div>
                    <em>共{this.props.count||0}个相关产品</em>
                </div>
                <ul className="search-list" style={this.state.more ? {} : { height: '150px', borderBottom: 0 }}>
                    {
                        this._renderItems(this.state.data)
                    }
                </ul>
                <div style={{margin: '0 auto',width: '1198px',position: 'relative'}}>
                    <p onClick={() => { this.setState({ more: !this.state.more }) }} className="classify-show">{this.state.more ? '收起' : '更多选项'}<i className={this.state.more ? "classify-show-icons classify-show-down" : "classify-show-icons classify-show-up"}></i></p>                    
                </div>
                <div className="search-list-bottom" id="list_top">
                    <a onClick={this._orderSelect.bind(this,1)} href="javascript:;" className={this.state.order_field == 1 ? "active" : ""}>默认</a>
                    <a onClick={this._orderSelect.bind(this,2)} href="javascript:;" className={this.state.order_field == 2 ? "active" : ""}>最新<span></span></a>
                    <a onClick={this._orderSelect.bind(this,3)} href="javascript:;" className={this.state.order_field == 3 ? "active" : ""}>最热<span></span></a>
                    <a onClick={this._orderSelect.bind(this,4)} href="javascript:;" className={this.state.order_field == 4 ? "active" : ""}>佣金<span></span></a>
                    <a onClick={this._orderSelect.bind(this,5)} href="javascript:;" className={this.state.order_field == 5 ? "active" : ""}>收益<span></span></a>
                    <a onClick={this._orderSelect.bind(this,6)} href="javascript:;" className={this.state.order_field == 6 ? "active" : ""}>评级<span></span></a>
                </div>
            </div>
        )
    }
}
