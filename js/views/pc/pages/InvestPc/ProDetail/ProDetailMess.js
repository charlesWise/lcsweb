'use strict'
//查看文件
import React from 'react';

import Http from './../../../../../controller/pcapi';
import Location from './../../../../../util/Location';

export default class ProDetailMess extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            // detailInfo: {},
            yieldIndex: 0,
            favor_flag: 2,
            fid: 0
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let detail = nextProps.detailInfo || {};
        this.setState({
            favor_flag: detail.favor_flag || []
        })
    }

    componentDidMount() {
        this.setState({
            fid: Location.queryString('fid') || 0
        })
    }
    

    _addFavorate(){
        Http.addToFavor({
            fund_id: Location.queryString('fid') || 0
        }).success((data, next)=>{
            this.setState({
                favor_flag: 1
            })
        })
    }

    _removeFavorate() {
        Http.delFavor({
            fund_id: Location.queryString('fid') || 0
        }).success((data, next) => {
            this.setState({
                favor_flag: 2
            })
        })
    }
    
    render(){
        let detail = this.props.detailInfo || {};
        let detailInfo = detail || {};
        let yields = detail.yield || [];
        return (
            <div className="detai-mess">
                <h3>{detailInfo.fund_type_str}-{detailInfo.fund_name}
                    {
                        yields && yields.length > 1 &&
                        yields.map((item, index, arr) => {
                            return (
                                <a key={index} className={this.state.yieldIndex == index ? "active" : ""}
                                    onClick={() => {
                                        this.setState({
                                            yieldIndex: index
                                        })
                                    }}
                                >
                                    {item.time_limit}
                                </a>
                            )
                        })
                    }
                </h3>
                <NoticeWrapper>
                    {
                        yields[this.state.yieldIndex] && yields[this.state.yieldIndex].yield_sub && yields[this.state.yieldIndex].yield_sub.length > 0 &&
                        yields[this.state.yieldIndex].yield_sub.map((item, index) => {
                            return (
                                <NoticeItem key={index} data={item}></NoticeItem>
                            )
                        })
                    }
                </NoticeWrapper>
                <p className="pro-mess-jindu">募集进度<span> <em style={{ left: (detailInfo.collect_process || 0) + '%' }}>{(detailInfo.collect_process || 0) + '%'}</em><i style={{ width: (detailInfo.collect_process || 0) + '%' }}></i></span></p>
                <p className="pro-mess-p">{detailInfo.collect_process_explain}</p>
                <div className="pro-mess-div">
                    <a href={'/viewfile.html?fid=' + this.state.fid} className="a-btn">预览材料</a>
                    <a href='/accountcenter.html?type=6' className="a-btn">合同申请</a>
                    <a className={this.state.favor_flag == 2 ? "a-btn" : "a-btn"}
                        onClick={() => {
                            if (!localStorage.getItem('user_token')) {
                                //去登入
                            } else {
                                if (this.state.favor_flag == 2) {
                                    this._addFavorate();
                                } else {
                                    this._removeFavorate();
                                }
                            }
                        }}
                    > {this.state.favor_flag == 2 ? '收藏' : '取消收藏'} </a>{ /*1-已收藏 2-未收藏*/}
                    <div className="pro-share">
                        分享到
                    <a href="javascript:;" className="icon-weibo" onClick={() => {
                            jiathis_sendto('tsina'); return false;
                        }}></a>
                        <a href="javascript:;" className="icon-qq" onClick={() => {
                            jiathis_sendto('qzone'); return false;
                        }}></a>
                        <a className="icon-email" onClick={()=>{
                            this.refs.mailBox.show()
                        }}></a>
                    </div>
                </div>
                <MailShare ref='mailBox' fid={this.state.fid}/>
            </div>
        )
    }
}

class NoticeWrapper extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <h4><span>投资金额</span><span>预期收益</span><span>返佣比例</span></h4>
                <div className="pro-mess">
                    { this.props.children }
                </div>
            </div>
        );
    }
}

class NoticeItem extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {
            userProfile: {}
        }
    }

    componentDidMount() {
        let userToken = localStorage.getItem('user_token') || ''
        if (userToken) {
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

    // 返佣比例
    _renderBackRate(rake_back_rate) {
        let backRateText = '';
        if (!localStorage.getItem('user_token')) { // 用户未登录
            backRateText = '登录可见'
        } else if (this.state.userProfile.status != 1) { // 1-通过 2-失败
            backRateText = '认证可见'
        } else {
            backRateText = rake_back_rate + '%';
        }
        return (
            <li className="red" style={{cursor:'pointer'}}
                onClick={()=>{
                    if (!localStorage.getItem('user_token')) { // 用户未登录
                        window.location.href = '/login.html'
                    } else if (this.state.userProfile.status != 1) { // 1-通过 2-失败
                        window.location.href = '/accountcenter.html?type=7'
                    } 
                }}
            >
                {backRateText}
            </li>
        );
    }

    render() {
        let item = this.props.data;
        return (
            <ul>
                <li>
                    {item.invest_from}万≤X
                    {
                        Boolean(item.invest_to && item.invest_to != 0) ? ('<' + item.invest_to + '万') : ''
                    }</li>
                <li>{item.annual_rate}</li>
                {this._renderBackRate(item.rake_back_rate)}
            </ul>
        );
    }
}

class MailShare extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {
            show: false
        }
    }

    show(){
        this.setState({
            show: true
        })
    }

    _close(){
        this.setState({
            show: false
        })
    }

    _mailShare() {
        let fid = this.props.fid;
        let email = this.refs.email.value;
        if (!fid || !email) return;
        Http.mailShare({
            fundId: fid,
            email: email
        }).success((source, next) => {
            this._close()
        }).error((source, next) => { })
    }

    render(){
        return (
            <div style={this.state.show ? { display: 'block' } : { display: 'none' }}>
                <div className="mask" onClick={this._close.bind(this)}></div>
                <div className="mail-box">
                    <div className='box-title'>邮件分享</div>
                    <div className='input-wrap'>
                        <span className='input-label'>邮箱地址：</span>
                        <input ref='email' className='input' type="text" placeholder='请输入邮箱地址'/>
                    </div>
                    <div className='btn-box'>
                        <span className='btn btn-cancel' onClick={this._close.bind(this)}>取消</span>
                        <span className='btn btn-confirm' onClick={this._mailShare.bind(this)}>确认</span>
                    </div>
                </div>
            </div>
        )
    }
}
