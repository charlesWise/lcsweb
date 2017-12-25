'use strict'
//精选产品
import React from 'react';
import SearchListTop from './SearchListTop';
import SearchList from './SearchList';
import Pages from './Pages';
import Http from './../../../../../controller/pcapi';
import Location from './../../../../../util/Location';
import NoDate from './../../../../../widget/NoDate'

export default class Plist extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {
            filter: {},
            count: 0,
            list: [],
            totalPage: 0,
            fund_type: '', //1：固收，2：证券基金，3：股权基金，4：信托产品，5：债权基金，6：资管计划
            order_field: 1 //默认：1 、最新：2 、最热 3、佣金 4、收益 5、评级 6
        }
    }
    _addItem(obj, key, value) {
        if (!this.state.filter[obj])
            this.state.filter[obj] = {};
        this.state.filter[obj][key] = value;
        this._getList()
    }

    _removeItem(obj, key) {
        if (this.state.filter[obj])
            delete this.state.filter[obj][key];
        this._getList()
    }

    componentDidMount() {
        this.state.fund_type = Location.queryString('ftype') || "";
        this._getList()
        let userToken = localStorage.getItem('user_token') || ''
        if (userToken) {
            this._getUserProfile();
        }
    }

    _getUserProfile() {
        Http.getUserProfile({}).success((data, next) => {
            data = data.data || {}
            let userProfile = data.profile || {}
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
        })
    }
    
    _getList(page_no = 1) {
        Http.fundList({
            page_no: page_no,
            fund_type: this.state.fund_type,
            order_field: this.state.order_field,
            search: JSON.stringify({ 'data': this._getSearchData() })
        }).success((source, next) => {
            var data = source.data || {};
            this.setState({
                list: data.rows || [],
                count: data.count || 0,
                totalPage: data.page_count || 0
            });
        })
    }

    _getSearchData(){
        let data = this.state.filter;
        let items = [];
        Object.keys(data).map((key, index, arr) => {
            var item = {};
            item.field = key;
            item.value = data[key];
            items.push(item);
        })
        return items;
    }

    _typeSelect(type) {
        this.state.fund_type = type;
        this._getList()
    }

    _typeUnselect() {
        this.state.fund_type = '';
        this._getList()
    }

    _orderSelect(order) {
        this.state.order_field = order;
        this._getList()
    }

    _orderUnselect() {
        this.state.order_field = 1;
        this._getList()
    }

    render() {
        return (
            <div>
                <SearchListTop parent={this} count={this.state.count} />
                {
                    this.state.list && this.state.list.length > 0 ?
                    this.state.list.map((item,index)=>{
                        return (
                            <ListItem key={index} data={item}/>
                        )
                    })
                    :
                    <NoDate />
                }
                <Pages top='#list_top' totalPage={this.state.totalPage} onClick={this._getList.bind(this)} />
            </div>
        )
    }
}

class ListItem extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {
            data: {},
            favor_flag: 0,
            userProfile: {}
        }
    }

    componentDidMount() {
        let userProfile = localStorage.getItem('userProfile')
        this.setState({
            userProfile: JSON.parse(userProfile) || {}
        })
    }

    componentWillMount() {
        let data = this.props.data || {};
        this.state.data = data || {};
        this.state.favor_flag = (data && data.favor_id) > 0 ? 1 : 0;
        this.forceUpdate()
    }

    componentWillReceiveProps(nextProps) {
        let data = nextProps.data || {};
        this.state.data = data || {};
        this.state.favor_flag = (data && data.favor_id) > 0 ? 1 : 0;
        // this.forceUpdate()
    }

    _addFavorate(fid) {
        Http.addToFavor({
            fund_id: fid
        }).success((data, next) => {
            this.setState({
                favor_flag: 1
            })
        })
    }

    _removeFavorate(fid) {
        Http.delFavor({
            fund_id: fid
        }).success((data, next) => {
            this.setState({
                favor_flag: 0
            })
        })
    }

    _getLabel(type){
        let label = ''
        switch (type) {
            case '2':
                label = '证券基金'
                break;
            case '3':
                label = '股权基金'
                break;
            case '4':
                label = '集合信托'
                break;
            case '5':
                label = '债权基金'
                break;
            case '6':
                label = '资管计划'
                break;
            default:
                break;
        }
        return label;
    }

    // 返佣比例
    _renderBackRate(rake_back_rate) {
        let backRateText = '';
        if (!localStorage.getItem('user_token')) { // 用户未登录
            backRateText = '登录可见'
        } else if (this.state.userProfile.status != 1) { // 1-通过 2-失败
            backRateText = '认证可见'
        } else {
            backRateText = rake_back_rate;
        }
        return (
            <p className="txt_1" style={{ cursor: 'pointer' }}
                onClick={() => {
                    if (!localStorage.getItem('user_token')) { // 用户未登录
                        window.location.href = '/login.html'
                    } else if (this.state.userProfile.status != 1) { // 1-通过 2-失败
                        window.location.href = '/accountcenter.html?type=7'
                    }
                }}
            >{backRateText}</p>
        );
    }

    render(){
        let data = this.state.data || {};
        return (
            <div className="prolist-item">
                <h4 className="prolist-item-name">
                    <span className="prolist-icon">{this._getLabel(data.fund_type)}</span>
                    <a href={"/prodetail.html?fid=" + data.fund_id}> {data.fund_name}
                        <em className="icons-show-list">{data.fund_status_str}</em>
                        {!!data.fund_rank_str && <em className="icons-show-list show-icons">{data.fund_rank_str}</em>}
                    </a>
                </h4>
                <ul className="prolist-item-info">
                    <li className="pro-item-role role1">
                        {this._renderBackRate(data.rake_back_rate)}
                        <p className="txt_2">佣金比例</p>
                    </li>
                    <li className="pro-item-role">
                        <p className="txt_1">{data.annual_rate}<em>%</em></p>
                        <p className="txt_2">基准收益</p>
                    </li>
                    <li className="pro-item-role">
                        <p className="txt_1">{data.time_limit}</p>
                        <p className="txt_2">产品期限</p>
                    </li>
                    <li className="pro-item-role">
                        <p className="txt_1">{data.min_buy_amount}</p>
                        <p className="txt_2">起投金额</p>
                    </li>
                    <li className="pro-item-role">
                        <p className="txt_1"> {data.item_fund_type_str} </p>
                        <p className="txt_2">投资领域</p>
                    </li>
                    <li className="progress-list-bar">
                        <div className="progress-bg">
                            <em className="propress-number" style={{ left: data.collect_process + '%' }}>{data.collect_process}%</em>
                            <span className="propress-speed" style={{ width: data.collect_process + '%' }}></span>
                            <em className="propress-txt">进度</em>
                        </div>
                    </li>
                    <li className="prolist-item-btn"><a href={"/prodetail.html?fid=" + data.fund_id} className="button-pro">预约投资</a></li>
                </ul>
                <p className="prolist-p-btn">
                    <a href={'/viewfile.html?fid='+data.fund_id}>预览材料</a>
                    <a href='javascript:;' onClick={() => {
                        if (!localStorage.getItem('user_token')) {
                            //去登入
                            window.Prompt.error('请先登录',()=>{
                                window.location.href = '/login.html'
                            })
                        } else {
                            if (this.state.favor_flag == 0) {
                                this._addFavorate(data.fund_id);
                            } else {
                                this._removeFavorate(data.fund_id);
                            }
                        }
                    }} >{this.state.favor_flag == 0 ? '收藏' : '取消收藏'}</a>
                </p>
            </div>
        )
    }
}
