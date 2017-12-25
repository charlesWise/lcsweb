'use strict'
//关于我们左边菜单
import React from 'react';
import Nav from './Nav';

export default class ContactUs extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            curIndex:0,
            navList:['联系我们']
        }
    }

    render(){
        return <div className="about_r">
            <Nav navList={this.state.navList} curIndex={this.state.curIndex} />
            <div className="about_content">
                <img src="/images/aboutUs/map.png" className="about_bg"></img>
                <p className="info"><img src="./images/aboutUs/phone.png" alt="" className="icon"></img>联系电话：400-877-6097</p>
                <p className="info"><img src="./images/aboutUs/email.png" alt="" className="icon"></img>合作邮箱：admin@cfylicai.com</p>
                <p className="info"><img src="./images/aboutUs/postcode.png" alt="" className="icon"></img>企业邮编 ：200120</p>
                <p className="info"><img src="./images/aboutUs/address.png" alt="" className="icon"></img>公司地址 : 上海市浦东新区世纪大道1777号12-B室</p>
            </div>
        </div>
    }
}
