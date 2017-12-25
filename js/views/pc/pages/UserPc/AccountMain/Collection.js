'use strict'
import React from 'react';
import Http from './../../../../../controller/pcapi';
import Pages from './../../InvestPc/Plist/Pages';
import NoDate from './../../../../../widget/NoDate';

export default class Collection extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            list:[],
            totalPage:1
        }
    }

    skipPage(curPage){
        this.fetchData(curPage);
    }

    fetchData(page_no){
        Http.fundFavor({page_no}).success((source, next) => {   //收藏列表
            this.setState({
                list:source.data.rows,
                totalPage:source.data.page_count
            })
        })
    }

    _cancelCollect(fund_id){
        Http.DelFavor({fund_id}).success((source, next) => {   //取消收藏
            this.fetchData(1)
        })
    }

    componentDidMount(){
        this.fetchData(1)
    }

    render(){
        return <div className="user-right">
            <div className="UploadAvatar">
                <h3>我的收藏</h3>
                {
                    this.state.list && this.state.list.length?<ul className="plist_list">
                        {
                            this.state.list && this.state.list.map((function(item,index){
                                return <li key={index}>
                                    <div className="prolist-item">
                                        <h4 className="prolist-item-name">
                                            <span> {item.fund_name}
                                                <em className="icons-show-list">{item.fund_status_str}</em>
                                            </span>
                                        </h4>
                                        <ul className="prolist-item-info">
                                            <li className="pro-item-role role1">
                                                <p className="txt_1">{item.rake_back_rate}</p>
                                                <p className="txt_2">返佣比例</p>
                                            </li>
                                            <li className="pro-item-role">
                                                <p className="txt_1">{item.annual_rate || '0%'}</p>
                                                <p className="txt_2">基准收益</p>
                                            </li>
                                            <li className="pro-item-role">
                                                <p className="txt_1">{item.time_limit}</p>
                                                <p className="txt_2">产品期限</p>
                                            </li>
                                            <li className="progress-list-bar">
                                                <div className="progress-bg">
                                                    <em className="propress-number" style={{left:item.collect_process+'%'}}></em>
                                                    <span className="propress-speed" style={{width:item.collect_process+'%'}}></span>
                                                    <em className="propress-txt">在售：{item.collect_process}%</em>
                                                </div>
                                            </li>
                                            <li className="prolist-item-btns">
                                                <a href={`prodetail.html?fid=${item.fund_id}`} className="button-pro">预约投资</a>
                                                <a href="javascript:;" className="button-pro" onClick={()=>this._cancelCollect(item.fund_id)}>取消收藏</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            }.bind(this)))
                        }
                        <Pages onClick={this.skipPage.bind(this)} totalPage={this.state.totalPage}/>
                    </ul>:<NoDate/>
                }
            </div>
        </div>
    }
}
