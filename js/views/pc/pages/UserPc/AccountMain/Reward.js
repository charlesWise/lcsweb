'use strict'
import React from 'react';
import Nav from '../../AboutUs/content/Nav';
import Http from './../../../../../controller/pcapi';
import Pages from './../../InvestPc/Plist/Pages';
import NoDate from './../../../../../widget/NoDate';

export default class Reward extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            curIndex:0,
            navList:['可用奖励','历史奖励'],
            usableList:[],
            historyList:[],
            detailInfo:{},
            totalPage:1,
        }
    }

    selected(index) {
        this.setState({
            curIndex: index
        })
        this.fetchData(1,index);
    }

    skipPage(curPage){
        this.fetchList(curPage);
    }

    fetchData(page_no,index) {
        let status = index || this.state.curIndex;
        if (status) {
            Http.TicketsList({page_no, status:-1}).success( (source, next) =>{
                this.setState({
                    historyList: source.data.rows,
                    totalPage: source.data.page_count
                })
            })
        } else {
            Http.TicketsList({page_no, status, is_expired: 0}).success( (source, next)=> {
                this.setState({
                    usableList: source.data.rows,
                    totalPage: source.data.page_count
                })
            })
        }
    }

    componentDidMount(){
        this.fetchData(1,0);
    }

    render(){
        return <div className="user-right">
            <div className="UploadAvatar">
                < Nav navList={this.state.navList} curIndex={this.state.curIndex} isDetailPage={this.state.isDetailPage} selected={this.selected.bind(this)}/>
                <p className={this.state.curIndex || !this.state.usableList.length?"dn":"reward_tip"}><i></i> *奖励自动使用，完成投资后与佣金一起结算</p>
                {
                    !this.state.curIndex?
                        this.state.usableList && this.state.usableList.length?<ul className="reward_list">
                            {
                                this.state.usableList && this.state.usableList.map((function(item,index){
                                    return <li key={index}>
                                            <div className="left">
                                                <span className="money">￥{item.amount}</span>
                                                <span className="title">{item.from}</span>
                                            </div>
                                            <div className="right">
                                                <span className="invest_money">{item.ticket_type_str}<i>{item.apply_scope_str}</i></span>

                                                <span className="time">有效期至：{item.end_active_date}</span>
                                            </div>
                                    </li>
                                }.bind(this)))
                            }
                        </ul>:<NoDate/>
                        :this.state.historyList && this.state.historyList.length?<ul className="reward_list">
                        {
                            this.state.historyList && this.state.historyList.map((function(item,index){
                                return <li key={index}>
                                    <div className="left">
                                        <span className="money">￥{item.amount}</span>
                                        <span className="title">{item.from}</span>
                                    </div>
                                    <div className="right">
                                        <span className="invest_money">{item.ticket_type_str}<i>{item.apply_scope_str}</i></span>

                                        <span className="time">有效期至：{item.end_active_date}</span>
                                        <span className="used">{item.status==1 && item.timeover==1?'已使用':item.timeover==1?'已过期':''}</span>
                                    </div>
                                </li>
                            }.bind(this)))
                        }
                    </ul>:<NoDate/>
                }
                <Pages key={this.state.curIndex} onClick={this.skipPage.bind(this)} totalPage={this.state.totalPage}/>
            </div>
        </div>
    }
}
