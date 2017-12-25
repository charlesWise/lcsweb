'use strict'
//关于我们左边菜单
import React from 'react';
import Nav from './Nav';
import Http from './../../../../../controller/pcapi';
import Pages from './../../InvestPc/Plist/Pages';
import NoDate from './../../../../../widget/NoDate';

export default class Partner extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            curIndex:0,
            navList:['合作伙伴'],
            partnerList:[],
            totalPage:1
        }
    }

    skipPage(curPage){
        this.fetchData(curPage);
    }

    fetchData(page){
        Http.parnerList({page,limit:5}).success((source, next) => {
            this.setState({
                partnerList:source.data.data,
                totalPage:source.data.total_page_num
            })
        })
    }

    componentDidMount(){
        this.fetchData(1)
    }

    render(){
        return <div className="about_r">
            <Nav navList={this.state.navList} curIndex={this.state.curIndex}/>
            <div className="about_content">
                {
                    this.state.partnerList && this.state.partnerList.length?
                        <ul className="partner_list">
                            {
                                this.state.partnerList && this.state.partnerList.map(function(item,index){
                                    return <li key={index}>
                                        <img src={item.banner.small} className="logo"></img>
                                        <p dangerouslySetInnerHTML={{__html: item.content}}></p>
                                    </li>
                                }.bind(this))
                            }
                        </ul>:<NoDate/>
                }
                <Pages onClick={this.skipPage.bind(this)} totalPage={this.state.totalPage}/>
            </div>
        </div>
    }
}
