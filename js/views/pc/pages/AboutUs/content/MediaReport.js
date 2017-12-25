'use strict'
//关于我们左边菜单
import React from 'react';
import Nav from './Nav';
import Http from './../../../../../controller/pcapi';
import Pages from './../../InvestPc/Plist/Pages';
import Location from 'util/Location';
import DateFormat from 'util/Date';
import NoDate from './../../../../../widget/NoDate';

export default class MediaReport extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            curIndex:0,
            isDetailPage:false,
            navList:['媒体报道'],
            reportList:[],
            title:'长富云APP2.0改版上线啦！',
            totalPage:1
        }
    }

    _getTime(time,accuracy) {
        if(accuracy=='second'){
            return DateFormat.format(new Date(+time), 'yyyy-MM-dd HH:mm:ss');
        }
        return DateFormat.format(new Date(+time), 'yyyy-MM-dd');
    }

    skipPage(curPage){
        this.fetchData(curPage);
    }

    goToDetailPage(id){
        this.setState({
            isDetailPage:true
        })
        Http.mediaDetail({id}).success(function (source, next) {   //消息详情
            this.setState({
                detailInfo:source.data,
                title:source.data.title
            })
        }.bind(this))
    }

    fetchData(page){
        Http.mediaList({page,limit:5}).success((source, next) => {   //报道列表
            this.setState({
                reportList:source.data.data,
                totalPage:source.data.total_page_num
            })
        })
    }

    componentDidMount(){
        let id = parseInt(Location.queryString('id'))||0;
        if(id){
            this.goToDetailPage(id);
        }
        this.fetchData(1)
    }

    render(){
        return <div className="about_r">
            <Nav navList={this.state.navList} curIndex={this.state.curIndex} isDetailPage={this.state.isDetailPage} goBack={()=>this.setState({isDetailPage:false})} title={this.state.title}/>
            <div className="about_content">
                {
                    !this.state.isDetailPage ? this.state.reportList && this.state.reportList.length?<ul className="report_list">
                        {
                            this.state.reportList && this.state.reportList.map(function (item, index) {
                                return <li key={index}>
                                    <img src={item.banner.big} alt="" className="logo"></img>
                                    <div className="right">
                                        <h2 onClick={()=>this.setState({isDetailPage:true})} style={{cursor:'pointer'}} onClick={()=>this.goToDetailPage(item.id)}>
                                            {item.title && item.title.length>20?
                                                `${item.title.slice(0,20)}...`
                                                :item.title}</h2>
                                        <p className="info" dangerouslySetInnerHTML={{__html:item.content}}></p>
                                        <p className="bottom">
                                            <span>来源：{item.source}</span>
                                            <span>{item.report_time}</span>
                                        </p>
                                    </div>
                                </li>
                            }.bind(this))
                        }
                        <Pages onClick={this.skipPage.bind(this)} totalPage={this.state.totalPage}/>
                    </ul>:<NoDate/>
                    :<div className="detailPage">
                        <h2 className="title">{this.state.detailInfo && this.state.detailInfo.title}</h2>
                        <p className="des">发布时间：{this._getTime(this.state.detailInfo && this.state.detailInfo.ctime * 1000,'second')}</p>
                        <div className="content">
                            <p className="info"dangerouslySetInnerHTML={{__html: this.state.detailInfo && this.state.detailInfo.content}}></p>
                            <div className="mark">
                                <p className="sign">{this.state.detailInfo && this.state.detailInfo.source}</p>
                                <p className="time">{this._getTime(this.state.detailInfo && this.state.detailInfo.ctime * 1000)}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    }
}
