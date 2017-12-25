'use strict'
//关于我们左边菜单
import React from 'react';

export default class Menu extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            menuList:[
                '关于我们',
                '帮助中心',
                '联系我们',
                '平台公告',
                '平台活动',
                '媒体报道',
                '合作伙伴',
                '新闻资讯',
                '路演视频'
            ]
        }
    }

    render(){
        return <div className="about_l">
            <div className="about_us"><span>关于</span><span>ABOUT US</span></div>
            <ul className="menu">
                {
                    this.state.menuList && this.state.menuList.map((function(item,index){
                        return  <li key={index} className={this.props.curIndex==index?'current':''}>
                            <a href={`aboutUs.html?type=${index}`}>{item}</a>
                        </li>
                    }.bind(this)))
                }
            </ul>
        </div>
    }
}
