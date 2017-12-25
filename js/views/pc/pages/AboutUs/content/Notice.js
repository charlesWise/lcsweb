'use strict'
//关于我们左边菜单
import React from 'react';
import Nav from './Nav';
import Http from './../../../../../controller/pcapi';
import Pages from './../../InvestPc/Plist/Pages';
import DateFormat from 'util/Date';
import Location from 'util/Location';
import NoDate from './../../../../../widget/NoDate';

export default class Notice extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            curIndex:0,
            isDetailPage:false,
            navList:['平台公告'],
            noticeList:[],
            title:'长富云APP2.0改版上线啦！',
            detailInfo:{},
            totalPage:1
        }
    }

    _getTime(time,accuracy) {
        if(accuracy=='second'){
            return DateFormat.format(new Date(+time), 'yyyy-MM-dd HH:mm:ss');
        }
        return DateFormat.format(new Date(+time), 'yyyy-MM-dd');
    }

    fetchData(page){
        Http.noticeList({page,limit:5}).success((source, next) => {   //公告列表
            this.setState({
                noticeList:source.data.data,
                totalPage:source.data.total_page_num
            })
        })
    }

    skipPage(curPage){
        this.fetchData(curPage);
    }

    componentDidMount(){
        let id = parseInt(Location.queryString('id'))||0;
        if(id){
            this.goToDetailPage(id);
        }
        this.fetchData(1)
    }

    goToDetailPage(id){
        this.setState({
            isDetailPage:true,
        })
        Http.anncDetail({id}).success(function (source, next) {   //公告详情
            this.setState({
                detailInfo:source.data,
                title:source.data && source.data.title
            })
        }.bind(this))
    }

    render(){
        return <div className="about_r">
            <Nav navList={this.state.navList} curIndex={this.state.curIndex} isDetailPage={this.state.isDetailPage} title={this.state.title} goBack={()=>this.setState({isDetailPage:false})}/>
            <div className="about_content">
                {
                    !this.state.isDetailPage?this.state.noticeList && this.state.noticeList.length?<ul className="noticeList">
                        {
                            this.state.noticeList && this.state.noticeList.map(function(item,index){
                                return <li key={index} onClick={()=>this.goToDetailPage(item.id)}>
                                    <p>
                                        <span className="left">{item.title}</span>
                                        <span className="right">{item.ctime}</span>
                                    </p>
                                </li>
                            }.bind(this))
                        }
                        <Pages onClick={this.skipPage.bind(this)} totalPage={this.state.totalPage}/>
                    </ul>:<NoDate/>:<div className="detailPage">
                        <h2 className="title">{this.state.detailInfo && this.state.detailInfo.title && this.state.detailInfo.title.length>30?
                            `${this.state.detailInfo && this.state.detailInfo.title && this.state.detailInfo.title.slice(0,30)}...`
                            :this.state.detailInfo && this.state.detailInfo.title}
                        </h2>
                        <p className="des">发布时间：{this._getTime(this.state.detailInfo && this.state.detailInfo.ctime * 1000,'second')}</p>
                        <div className="content">
                            <p className="info">{this.state.detailInfo && this.state.detailInfo.content}</p>
                            <div className="mark">
                                <p className="sign">{this.state.detailInfo && this.state.detailInfo.create_name}</p>
                                <p className="time">{this._getTime(this.state.detailInfo && this.state.detailInfo.ctime * 1000)}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    }
}
