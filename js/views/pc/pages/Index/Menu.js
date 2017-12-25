import React from 'react';
import Http from './../../../../controller/pcapi';
import Location from './../../../../util/Location';

import SearchInput from './SearchInput';

export default class Menu extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            show: false,
            countList: [],
            isLogin:false
        }
    }

    componentDidMount() {
        let fund_type = Location.queryString('ftype') || "";
        let userToken = localStorage.getItem('user_token');
        this.setState({
            fund_type: fund_type
        })
        this._getIndex();
        if(userToken){
            this.setState({
                isLogin:true
            })
        }
    }

    _getIndex() {
        Http.indexInit({
        }).success((source, next) => {
            var data = source.data || {};
            this.setState({
                countList: data.fund_type_fund_count_list || []
            });
        })
    }

    _getCount(type){
        let list = this.state.countList;
        if(!list || list.length < 1) return '';
        for(let i = 0; i < list.length; i++){
            if (list[i].fund_type == type){
                return '(' + list[i].fund_count + ')'
            }
        }
        return '';
    }

    render (){
        return (
            <div className="header-top">
                <div className="nav-bar">
                    <div className="logo">
                        <a href="javascript:;" ><img src="/images/index/logo.png" className="img1" /></a>
                    </div>
                    <ul className="menu-top">
                        <li><a className={(window.location.pathname == '/' || window.location.pathname == '/index.html') ? "ma-te active" : 'ma-te'} href="/index.html" ><span>首页</span></a></li>
                        <li><a className={this.state.fund_type == '1000'? "ma-te active" : 'ma-te'} href="/plist.html?ftype=1000" ><span>最新{this._getCount(1000)}</span></a></li>
                        <li><a className={this.state.fund_type == '1001'? "ma-te active" : 'ma-te'} href="/plist.html?ftype=1001" ><span>最热{this._getCount(1001)}</span></a></li>
                        <li><a className={this.state.fund_type == '1002'? "ma-te active" : 'ma-te'} href="/plist.html?ftype=1002" ><span>精选{this._getCount(1002)}</span></a></li>
                        <li onMouseEnter={() => {
                            this.setState({
                                show: true
                            })
                        }} onMouseLeave={() => {
                            this.setState({
                                show: false
                            })
                            }}><a className={(window.location.pathname == '/plist.html' && !this.state.fund_type) || (this.state.fund_type == '2' || this.state.fund_type == '2' || this.state.fund_type == '3' || this.state.fund_type == '4' || this.state.fund_type == '5' || this.state.fund_type == '6') ? "ma-te active" : 'ma-te'} href="/plist.html"><span>产品</span></a>
                            {
                                !!this.state.show &&
                                <div className="ment-kuan">
                                    <div className="ment-ma">
                                        <div className="men-one">
                                            <a href="/plist.html?ftype=4" className="one-a" >
                                                <span className="men-span">
                                                    <i className="men-i1 men-i"></i><em>集合信托{this._getCount(4)}</em>
                                                </span>
                                            </a>
                                        </div>

                                        <div className="men-one">
                                            <a href="/plist.html?ftype=6" className="one-a" >
                                                <span className="men-span">
                                                    <em>资管计划{this._getCount(6)}</em>
                                                </span>
                                            </a>
                                        </div>
                                        <div className="men-one">
                                            <a href="/plist.html?ftype=5" className="one-a" >
                                                <span className="men-span">
                                                    <i className="men-i1 men-i"></i><em>债券基金{this._getCount(5)}</em>
                                                </span>
                                            </a>
                                        </div>

                                        <div className="men-one">
                                            <a href="/plist.html?ftype=3" className="one-a" >
                                                <span className="men-span">
                                                    <em>股权基金{this._getCount(3)}</em>
                                                </span>
                                            </a>
                                        </div>

                                        <div className="men-one">
                                            <a href="/plist.html?ftype=2" className="one-a" >
                                                <span className="men-span">
                                                    <em>证券基金{this._getCount(2)}</em>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            }
                        </li>
                    </ul>
                </div>
                <div className="nav-bar-r">
                    <ul className="menu-top">
                        <li>
                            <SearchInput/>
                        </li>
                        <li className={this.state.isLogin?"nav-bar-gai active":'nav-bar-gai'}>
                            <a className="nav-zh ma-te" href="/accountcenter.html" >
                                <i></i>
                                <em>账户中心</em>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}