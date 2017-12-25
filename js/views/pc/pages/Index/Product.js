'use strict'
//精选产品
import React from 'react';
import Http from './../../../../controller/pcapi';

export default class Product extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            name: '',
            count: 0,
            type: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        let plist = nextProps.data && nextProps.data.fund_rows || [];
        if (plist.length > 0) {
            this._onMouseEnter(plist[0].fund_type, plist[0].fund_type_str);
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
            let userProfile = data.profile || {}
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
        })
    }

    _onMouseEnter(type, type_str) {
        this.setState({
            type: type,
            name: type_str,
            count: this._getCount(type)
        })
    }    

    _getCount(type){
        let list = this.props.data && this.props.data.fund_type_fund_count_list || [];
        for(let i = 0; i < list.length; i++){
            if (list[i].fund_type == type){
                return list[i].fund_count;
            }
        }
        return 0;
    }

    render(){
        let plist = this.props.data && this.props.data.fund_rows || [];
        if(plist.length < 1) return null;
        return (
            <div className="recommend-mains">
                <h2>精选产品 <em>优质之选为您推荐</em></h2>
                <div className="plist-inner">
                    <div className="recommend-aside">
                        <p className="aside-p"><em>{this.state.name}</em> <a>（共{this.state.count}款）</a> </p>
                        <a href={'/plist.html?type='+this.state.type} className="view-more">查看更多</a>
                        <img style={{ width: '210px', height: '605px'}} src="/images/index/Artboard.png" />
                    </div>
                    <div className="recommend-info">
                        {
                            plist.map((item,index)=>{
                                if(index > 5) return null;
                                return <Item key={index} data={item} onMouseEnter={this._onMouseEnter.bind(this, item.fund_type, item.fund_type_str)}/>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfile: {}
        }
    }

    componentDidMount() {
        let userProfile = localStorage.getItem('userProfile')
        this.setState({
            userProfile: JSON.parse(userProfile) || {}
        })
    }

    // 返佣比例
    _renderBackRate(rake_back_rate) {
        let backRateText = '';
        if (!localStorage.getItem('user_token')) { // 用户未登录
            return <em style={{ color: '#FF801A'}}><i style={{fontSize: '20px' }}>{'登录可见'}</i></em>
        } else if (this.state.userProfile.status != 1) { // 1-通过 2-失败
            return <em style={{ color: '#FF801A' }}><i style={{ fontSize: '20px' }}>{'认证可见'}</i></em>
        } else {
            if (rake_back_rate) {
                return < em style={{ color: '#FF801A' }}> <i>{rake_back_rate.split('%')[0]}</i> %</em >
            } else {
                return <em style={{ color: '#FF801A' }}><i>{rake_back_rate}</i></em>
            }
        }
    }
    
    render(){
        let data = this.props.data || {}
        return (
            <ul className="ul-nav" onMouseEnter={() => { this.props.onMouseEnter && this.props.onMouseEnter() }}>
                <li className="n-li1">
                    <a href={"/prodetail.html?fid=" + data.fund_id}><p className="n-p" style={{ cursor: 'pointer' }}>{data.fund_name}</p></a>
                    {
                        !!data.fund_rank_str && 
                        <p className="n-p1">{data.fund_rank_str}</p>
                    }
                </li>
                <li className="n-li2">
                    <p className="n-p">{this._renderBackRate(data.rake_back_rate)}</p>
                    <p className="n-p2">返佣比例</p>
                </li>
                <li className="n-li2">
                    <p className="n-p"><em>{data.annual_rate}</em></p>
                    <p className="n-p2 tb">基准收益</p>
                </li>
                <li className="n-li2">
                    <p className="n-p"><em>{data.time_limit}</em></p>
                    <p className="n-p2 tb">产品期限</p>
                </li>
                <li className="n-li3">
                    <p className="progress-bgcolor">
                        <span className="propress-goB prel" style={{ width: data.collect_process+'%' }}></span>
                    </p>
                    <p className="n-p2 tb">在售：{data.collect_process}%</p>
                </li>

                <li className="haps"><a href={"/prodetail.html?fid=" + data.fund_id}>预约投资</a></li>
            </ul>
        )
    }
}
