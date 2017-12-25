'use strict'
//个人资料
import React from 'react';

import Http from './../../../../../controller/pcapi';

export default class PersonalData extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            userInfo: {},
            accountInfo: {},
            loaded: false
        }
    }

    componentDidMount() {
        this._getPersonData();
        this._getAccountInfo();
    }
    
    _getPersonData(){
        Http.getUserProfile({}).success((data, next)=>{
            this.setState({
                userInfo: data.data.profile || {},
                loaded : true
            })
        })
    }

    _getAccountInfo() {
        Http.getAccountInfo({}).success((data, next) => {
            this.setState({
                accountInfo: data.data.info || {}
            })
        })
    }

    _onClick(index){
        this.props.selected && this.props.selected(index)
    }

    render(){
        if (!this.state.loaded) return null;
        var userInfo = this.state.userInfo;
        return (
            <div className="user-right">
                <div className="user-rg-cont">
                    <h3>个人资料</h3>
                    <div className="PersonalData">
                        <ul>
                            <li><i className="icon-pd01"></i>姓名</li>
                            <li>{userInfo.uname}</li>
                            <li></li>
                        </ul>
                        <ul>
                            <li><i className="icon-pd02"></i>身份认证</li>
                            <li className={!!userInfo.person_id ? '' : 'hui999'}>{!!userInfo.person_id ? userInfo.person_id : '保障账户安全与资金安全'}</li>
                            <li>
                                {
                                    !userInfo.person_id &&
                                    <button onClick={this._onClick.bind(this, 10)}>未设置</button>
                                }
                            </li>
                        </ul>
                        <ul>
                            <li><i className="icon-pd03"></i>性别</li>
                            <li className={!!userInfo.sex ? '' : 'hui999'}>{!!userInfo.sex ? userInfo.sex_str : '身份认证后显示'}</li>
                            <li></li>
                        </ul>
                        <ul>
                            <li><i className="icon-pd04"></i>手机号码</li>
                            <li>{userInfo.mobile.substr(0, 3) + '****' + userInfo.mobile.substr(7, 4)}</li>
                            <li><button onClick={this._onClick.bind(this, 11)}>修改</button></li>
                        </ul>
                        <ul>
                            <li><i className="icon-pd05"></i>登录密码</li>
                            <li>********</li>
                            <li><button onClick={this._onClick.bind(this, 9)}>修改</button></li>
                        </ul>
                        <ul>
                            <li><i className="icon-pd06"></i>提现密码</li>
                            <li className="hui999">保障资金安全，用于资金提现</li>
                            <li>
                                {
                                    this.state.accountInfo.pay_password_isset == 1 ? 
                                        <button onClick={this._onClick.bind(this, 13)}>修改</button>
                                        :
                                        <button onClick={this._onClick.bind(this, 13)}>未设置</button>
                                }
                            </li>
                        </ul>
                        <ul>
                            <li><i className="icon-pd07"></i>职业认证</li>
                            <li className="hui999">长富云理财师认证</li>
                            {
                                <li><button onClick={()=>{
                                    userInfo.status != 1 && this._onClick(7)
                                }}>{userInfo.status == 1 ? '已认证' : (userInfo.status == 2 ? '认证失败' : (userInfo.status == '' ? '未认证' : '审核中'))}</button></li>
                            }
                        </ul>
                        <ul>
                            <li><i className="icon-pd08"></i>服务区域</li>
                            <li>{userInfo.province + userInfo.city}</li>
                            <li><button onClick={this._onClick.bind(this, 12)}>修改</button></li>
                        </ul>
                        <ul>
                            <li><i className="icon-pd09"></i>联系地址</li>
                            <li>{userInfo.address}</li>
                            <li><button onClick={this._onClick.bind(this, 8)}>修改</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
