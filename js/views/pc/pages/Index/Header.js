'use strict'
//header
import React from 'react';
import Menu from './Menu';
import Http from './../../../../controller/pcapi';

export default class Header extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            userProfile: {}
        }
    }

    componentDidMount() {
        let userToken = localStorage.getItem('user_token') || ''
        if(userToken){
            this._getUserProfile();
        }
    }

    _getUserProfile() {
        Http.getUserProfile({}).success((data, next) => {
            data = data.data || {}
            this.setState({
                userProfile: data.profile || {}
            })
        })
    }

    _onLogout() {
        sessionStorage.clear()
        localStorage.clear()
        window.location.href = '/index.html'
    }

    render(){
        return (
            <div className="header">
                <div className="head-newj">
                    <div className="head-center">
                        <div className="head-zuo">
                            <span className="head-zuo-span head-zuo-span2">
                                <img src="/images/index/a-index-img1.png" />
                                <i>客服热线：400-877-6097</i>
                            </span>
                        </div>
                        <ul className="head-you">
                            <li>
                                {
                                    !!this.state.userProfile.mobile ?
                                        <span className="head-zuo-span">
                                            <a href="javascript:;" > 欢迎您  <i className=" le-a">{this.state.userProfile.mobile}</i> 来到长富云  <i onClick={this._onLogout.bind(this)} className="le-a"> [退出] </i></a>
                                        </span>
                                        :
                                        <span className="head-zuo-span">
                                            <a href="/login.html" ><i className="head-zuo-i">登录</i></a>
                                        </span>
                                }
                               
                            </li>
                            {
                                !this.state.userProfile.mobile && 
                                <li>
                                    <span className="head-zuo-span">
                                        <a href="/register.html" ><i className="head-zuo-i">免费注册</i></a>
                                    </span>
                                </li>
                            }

                            <li className="head-mobile" onMouseEnter={() => {
                                this.setState({
                                    app_show: true
                                })
                            }} onMouseLeave={() => {
                                this.setState({
                                    app_show: false
                                })
                            }}>
                                <span className="head-zuo-span head-yi">
                                    <i className="head-mobile-i"></i>
                                    <i className="head-zuo-i">移动端</i>
                                    <i className="header-arrow"></i>
                                    {
                                        this.state.app_show &&
                                            <div className="erweima">
                                                <img src="/images/index/erweima_app.png" className="head-z-img" />
                                                <p className="text">扫码下载长富云APP</p>
                                            </div>
                                    }
                                </span>
                            </li>

                            <li>
                                <span className="head-zuo-span head-zuo-span2 le-a">
                                    <a href="/aboutUs.html?type=0" ><i>关于我们</i></a>
                                    <a href="https://org.cfylicai.com/org/orgregister_toAddOrgUser.jhtml" style={{marginLeft:'20px'}} target="blank"><i>机构入驻</i></a>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <Menu />
            </div>
        )
    }
}
