'use strict'
//关于我们左边菜单
import React from 'react';
import Nav from './Nav';
import Http from './../../../../../controller/pcapi';
import Pages from './../../InvestPc/Plist/Pages';
import NoDate from './../../../../../widget/NoDate';
import DateFormat from 'util/Date';

export default class News extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            curIndex:0,
            isDetailPage:false,
            navList:['新闻资讯'],
            newsList:[],
            title:'长富云APP2.0改版上线啦！',
            totalPage:0,
            detailInfo:{}
        }
    }

    skipPage(curPage){
        this.fetchData(curPage);
    }

    goToDetailPage(index){
        let info = this.state.newsList && this.state.newsList[index];
        this.setState({
            isDetailPage:true,
            detailInfo:info,
            title:info && info.title
        })
    }

    _getTime(time,accuracy) {
        if(accuracy=='second'){
            return DateFormat.format(new Date(+time), 'yyyy-MM-dd HH:mm:ss');
        }
        return DateFormat.format(new Date(+time), 'yyyy-MM-dd');
    }

    fetchData(page){
        Http.infoList({page,limit:5}).success((source, next)=> {
            this.setState({
                newsList:source.data.data,
                totalPage:source.data.total_page_num
            })
        })
    }

    componentDidMount(){
        this.fetchData(1)
    }

    render(){
        return <div className="about_r">
                <Nav navList={this.state.navList} curIndex={this.state.curIndex} isDetailPage={this.state.isDetailPage} goBack={()=>this.setState({isDetailPage:false})} title={this.state.title}/>
                <div className="about_content">
                    {
                        !this.state.isDetailPage ? this.state.newsList && this.state.newsList.length?<ul className="news_list">
                            {
                                this.state.newsList && this.state.newsList.map(function (item, index) {
                                    return <li key={index}>
                                        <img src={item.banner.origin} className="logo"></img>
                                        <div className="right">
                                            <h2 style={{cursor:'pointer'}} onClick={()=>this.goToDetailPage(index)}>{item.title && item.title.length>20?
                                                `${item.title.slice(0,20)}...`
                                                :item.title}</h2>
                                            <div className="info" dangerouslySetInnerHTML={{__html:item.content}} style={{height:'60px'}}></div>
                                            <p className="bottom">
                                                <span>来源：{item.source}</span>
                                                <span>{item.report_time}</span>
                                            </p>
                                        </div>
                                    </li>
                                }.bind(this))
                            }
                        </ul>:<NoDate/>
                        :<div className="detailPage">
                            <h2 className="title">{this.state.detailInfo && this.state.detailInfo.title}</h2>
                            <p className="des">发布时间：{this._getTime(this.state.detailInfo && parseInt(this.state.detailInfo.report_time) * 1000,'second')}</p>
                            <div className="content">
                                <p className="info"dangerouslySetInnerHTML={{__html: this.state.detailInfo && this.state.detailInfo.content}}></p>
                                <div className="mark">
                                    <p className="sign">{this._getTime(this.state.detailInfo && parseInt(this.state.detailInfo.report_time) * 1000)}</p>
                                    <p className="time"></p>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        this.state.isDetailPage?''
                            :<Pages onClick={this.skipPage.bind(this)} totalPage={this.state.totalPage}/>
                    }
                </div>
            </div>
    }
}
