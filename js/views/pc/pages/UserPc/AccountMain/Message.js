'use strict'
import React from 'react';
import Nav from '../../AboutUs/content/Nav';
import Http from './../../../../../controller/pcapi';
import Pages from './../../InvestPc/Plist/Pages';
import NoDate from './../../../../../widget/NoDate';

export default class Message extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            curIndex:0,
            isDetailPage:false,
            title:'长富云APP2.0改版上线啦！',
            navList:['未读消息(99)','已读消息(99)'],
            unReadList:[],
            readList:[],
            isAllSign:false,
            detailInfo:{},
            totalPage:1
        }
    }

    skipPage(curPage){
        this.fetchData(curPage,this.state.curIndex+1);
    }

    allRead(){
        Http.setReaded({}).success((source, next) => {   //全部标为已读
            console.log('success!')
        })
    }

    fetchData(page,read){
        if(read==1){
            Http.messageList({page,read,limit:5}).success((source, next) => {   //未读
                this.state.navList.splice(0,1,`未读消息(${source.data.total_row_num})`)
                let newNavList = this.state.navList;
                this.setState({
                    unReadList:source.data.data,
                    totalPage:source.data.total_page_num,
                    navList:newNavList
                })
            })
        }else{
            Http.messageList({page,read,limit:5}).success((source, next) => {   //已读
                this.state.navList.splice(1,1,`已读消息(${source.data.total_row_num})`)
                let newNavList = this.state.navList;
                this.setState({
                    readList:source.data.data,
                    totalPage:source.data.total_page_num,
                    navList:newNavList
                })
            })
        }
    }

    selected(index) {
        this.setState({
            curIndex: index
        })
        this.fetchData(1,index+1);
    }

    goToDetailPage(id){
        this.setState({
            isDetailPage:true
        })
        Http.getUserMessageById({id}).success(function (source, next) {   //消息详情
            this.setState({
                detailInfo:source.data
            })
        }.bind(this))
    }

    componentDidMount(){
        this.fetchData(1,2);
        this.fetchData(1,1);
    }

    render(){
        return <div className="user-right">
            <div className="UploadAvatar">
                <Nav navList={this.state.navList} curIndex={this.state.curIndex} isDetailPage={this.state.isDetailPage} selected={this.selected.bind(this)} isReturn='true' goBack={()=>this.setState({isDetailPage:false})}/>
                <a className={!this.state.curIndex?this.state.isAllSign?"sign current":'sign':'dn'} href="javascript:;" onClick={()=>this.setState({isAllSign:true})}>
                    <img src={this.state.isAllSign?"/images//aboutUs/selected.png":"/images//aboutUs/un_selected.png"} alt=""/>
                    <span onClick={this.allRead.bind(this)}>全部标为已读</span>
                </a>
                {
                    !this.state.isDetailPage?
                        this.state.curIndex?
                            this.state.readList && this.state.readList.length?<ul className="message_list">
                                {
                                    this.state.readList && this.state.readList.map((function(item,index){
                                        return <li key={index} onClick={this.goToDetailPage.bind(this,item.id)}>
                                            <p className="info">
                                                <span className="text">{item.title}</span>
                                                <span className="time">{item.ctime}</span>
                                            </p>
                                        </li>
                                    }.bind(this)))
                                }
                            </ul>:<NoDate/>
                            :this.state.unReadList && this.state.unReadList.length?<ul className="message_list">
                            {
                                this.state.unReadList && this.state.unReadList.map((function(item,index){
                                    return <li key={index} onClick={this.goToDetailPage.bind(this,item.id)}>
                                        <p className="info">
                                            <i className={this.state.isAllSign?"dot read":"dot"}></i>
                                            <span className="text">{item.title}</span>
                                            <span className="time">{item.ctime}</span>
                                        </p>
                                    </li>
                                }.bind(this)))
                            }
                        </ul>:<NoDate/>:
                            <div className="detailPage">
                                <h2 className="title">{this.state.detailInfo.title}</h2>
                                <p className="des">发布时间：{this.state.detailInfo.ctime}</p>
                                <div className="content">
                                    <p className="info">{this.state.detailInfo.content}</p>
                                    <div className="mark">
                                        <p className="sign">{this.state.detailInfo.from_uname}</p>
                                        <p className="time">{this.state.detailInfo && this.state.detailInfo.ctime.split(' ')[0]}</p>
                                    </div>
                                </div>
                            </div>
                }
                <Pages key={this.state.curIndex} onClick={this.skipPage.bind(this)} totalPage={this.state.totalPage}/>
            </div>
        </div>
    }
}
