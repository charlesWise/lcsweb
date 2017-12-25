'use strict'
//关于我们左边菜单
import React from 'react';

export default class Nav extends React.Component {
    constructor(...props){
        super(...props);
    }

    render(){
        return <ul className="about_nav">
            {
                this.props.isReturn && this.props.isDetailPage?<span className="return_btn" onClick={this.props.goBack && this.props.goBack.bind(this)}>返回列表</span>:
                this.props.navList && this.props.navList.map(function(item,index){
                    return <li className={this.props.curIndex==index?'current':''} key={index} onClick={this.props.selected && this.props.selected.bind(this,index)}>
                        <a onClick={this.props.goBack && this.props.goBack.bind(this)}><span>{item}</span></a>
                        {
                            this.props.isDetailPage && this.props.isDetailPage?<span className={this.props.title?'':'dn'}>>{this.props.title}</span>
                            :''
                        }
                    </li>
                }.bind(this))
            }
            </ul>
    }
}
