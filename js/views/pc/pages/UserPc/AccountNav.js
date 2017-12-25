'use strict'
//账户中心左侧
import React from 'react';
import Http from './../../../../controller/pcapi';

var personCenterIndex = [1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 21]
var personDataIndex = [1, 7, 8, 9, 10, 11, 12, 13]
var fundIndex = [2,16,17,18]

export default class AccountNav extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            show_person: false,
            show_fund: false,
            userProfile: {},
            accountInfo: {},
            bankInfo: {},
            avatar_url: ''
        }
    }
    
    componentDidMount() {
        this._getUserInfo();
        this._getUserProfile();
    }

    componentWillReceiveProps(nextProps) {
        this.state.show_person = personCenterIndex.indexOf(nextProps.curIndex * 1) != -1;
        this.state.show_fund = fundIndex.indexOf(nextProps.curIndex * 1) != -1;
    }
    
    _getUserInfo(){
        Http.getAccountInfo({}).success((data, next)=>{
            data = data.data || {}
            this.setState({
                accountInfo: data.info || {},
                bankInfo: data.default_bank_info || {}
            })
        })
    }

    _getUserProfile() {
        Http.getUserProfile({}).success((data, next) => {
            data = data.data || {}
            let userProfile = data.profile || {};
            let avatar_url = userProfile.avatar_url || '';
            this.setState({
                userProfile: userProfile || {},
                avatar_url: avatar_url
            })
        })
    }

    _togglePersonal() {
        if (personCenterIndex.indexOf(this.props.curIndex) == -1){
            this.props.selected && this.props.selected(6)
        }
        this.setState({
            show_person: !this.state.show_person,
            show_fund:false
        })
        
    }

    _toggleFund() {
        if (fundIndex.indexOf(this.props.curIndex) == -1){
            this.props.selected && this.props.selected(16)
        }
        this.setState({
            show_fund: !this.state.show_fund,
            show_person:false
        })

    }

    _onPersonalClick(e,index){
        e.stopPropagation();
        this.props.selected && this.props.selected(index)
    }

    _onSelected(index) {
        this.setState({
            show_person: false
        })
        this.props.selected && this.props.selected(index);
    }

    _modifyAvatar(file) {
        if (!file) return;
        let data = new FormData();
        data.append('file', file)
        Http.modifyAvatar(data).success((data, next) => {
            data = data.data || {}
            this.setState({
                avatar_url: data.avatar_url || ''
            })
            window.Prompt.success('修改成功！')
        }).error((data, next)=>{
            window.Prompt.error(data.message)
        })
    }

    _onAvaClick(){
        this.props.selected && this.props.selected(20)
    }

    render(){
        return (
            <div className="user-left">
                <div className="user-head">
                    <div style={{ position: 'relative' }} onClick={this._onAvaClick.bind(this)}>
                        <img src={this.state.avatar_url ? this.state.avatar_url : "/images/userPc/user-head.png"} className="head-portrait" />
                        {/* <input ref='file' type="file" onChange={(e) => {
                            let file = e.target.files[0];
                            this._modifyAvatar(file)
                        }} accept="image/png, image/jpeg" style={{ position: 'absolute', width: '100%', top: 0, bottom: 0, display: 'block', opacity: 0 }} /> */}
                    </div>
                    <p className="head-name">{this.state.userProfile.uname}<span className="authentication"><i className={this.state.userProfile.person_id && this.state.userProfile.person_id.length > 0 ? "icon-authentication icon-authentication-act" : "icon-authentication"}></i>{this.state.userProfile.person_id && this.state.userProfile.person_id.length > 0 ? '已认证' : '未认证'}</span></p>
                    <p className="head-icons">
                        {
                            // this.state.accountInfo.pay_password_isset == '0' ? "设了支付密码" : "没设"
                        }
                        {
                            // this.state.accountInfo.default_bank_status == '2' ? "没银行卡" : "有"
                        }
                        <span className={this.state.userProfile.status == 1 ? "icon-user icon-user-act" : "icon-user"}>
                            {this.state.userProfile.status != 1 && <i className="icon-notice" />}
                        </span>
                        <span className={this.state.accountInfo.pay_password_isset == '0' ? "icon-card icon-card-act" : "icon-card"}/>
                        <span className={this.state.accountInfo.default_bank_status == '2' ? "icon-password" : "icon-password icon-password-act"} />
                    </p>
                </div>
                <ul>
                    <li className={this.props.curIndex == 0 ? 'active' : ''} onClick={this._onSelected.bind(this, 0)}>账户总览<i></i></li>
                    <li className={personCenterIndex.indexOf(this.props.curIndex * 1) != -1 ? 'active' : ''} onClick={this._togglePersonal.bind(this)}>个人中心<i className={this.state.show_person ? "icon-arrow icon-up" : "icon-arrow icon-down"}></i>
                        <div className={this.state.show_person ? "user-left-slide" : "user-left-slide dn"}>
                            <p className={this.props.curIndex == 6 ? 'active' : ''} onClick={(e) => {
                                this._onPersonalClick(e, 6)
                            }}>我的合同</p>
                            <p className={(this.props.curIndex == 14 || this.props.curIndex == 15 || this.props.curIndex == 21) ? 'active' : ''} onClick={(e) => {
                                this._onPersonalClick(e, 14)
                            }}>银行卡</p>
                            <p className={personDataIndex.indexOf(this.props.curIndex * 1) != -1 ? 'active' : ''} onClick={(e) => {
                                this._onPersonalClick(e, 1)
                            }}>个人资料</p>
                        </div>
                    </li>
                    <li className={fundIndex.indexOf(this.props.curIndex * 1) != -1 ? 'active' : ''} onClick={()=>this._toggleFund()}>资金中心<i className="icon-arrow"></i>
                    <div className={this.state.show_fund ? "user-left-slide" : "dn"}>
                            <p className={this.props.curIndex == 16 ? 'active' : ''} onClick={(e)=>this._onPersonalClick(e,16)}>累计投资</p>
                            <p className={this.props.curIndex == 2 ? 'active' : ''} onClick={(e)=>this._onPersonalClick(e,2)}>提现</p>
                            <p className={this.props.curIndex == 17 ? 'active' : ''} onClick={(e)=>this._onPersonalClick(e,17)}>累计赚取</p>
                            <p className={this.props.curIndex == 18 ? 'active' : ''} onClick={(e)=>this._onPersonalClick(e,18)}>资金记录</p>
                        </div>
                    </li>
                    <li className={this.props.curIndex == 3 ? 'active' : ''} onClick={this._onSelected.bind(this, 3)}>我的奖励</li>
                    <li className={this.props.curIndex == 4 ? 'active' : ''} onClick={this._onSelected.bind(this, 4)}>我的收藏<i></i></li>
                    <li className={this.props.curIndex == 5 ? 'active' : ''} onClick={this._onSelected.bind(this, 5)}>消息管理<i></i></li>
                </ul>
                <p className="user-left-pic"><img src="/images/userPc/left-pic.png" /></p>
                <p className="user-left-p">生活，有期盼才有色彩~</p>
            </div>
        )
    }
}
