'use strict'
import React from 'react';

module.exports = class UserOption extends React.Component {
    constructor(...props) {
        super(...props);
    }

    render(){
        let isLike = this.props.isLike||this.props.showLikeNum;
        let isMyFarm = this.props.isMyFarm;
        let userInfo = this.props.userInfo||{};
        return <div>
                <div className="log-tr" style={{right:'.634rem'}}>
                    <span onClick={isMyFarm?()=>this.props.goWatch():()=>{}}>
                        <img className="log-give" src={`images/loggedIn/${!isMyFarm && !userInfo.is_follow?'un_':''}watch.png`} alt=""/>
                        <a className="log-give-mask">{isMyFarm?isLike?userInfo.follow_num:'':userInfo.follow_count}</a>
                    </span>
                    &nbsp;
                    <span onClick={isMyFarm?()=>this.props.goThumb():this.props.thumbsUp}>
                        <img className="log-give" src={`images/loggedIn/${!isMyFarm && !isLike?'un_':''}log_give.png`} alt=""/>
                        <a className="log-give-mask">{isMyFarm?isLike?userInfo.like_num:'':userInfo.like_count}</a>
                    </span>
                    &nbsp;
                   <span className="log-share" onClick={this.props.share}>
                       <a href="javascript:;"><img src="images/loggedIn/log_share.png" alt=""/></a>
                    </span>
                </div>

                <div className="log-tr" style={{right:'1rem',top:'2.5rem'}}>
                        <span>
                            <img className="log-give" src="images/loggedIn/log_num.png" alt=""/>
                            <a className="log-give-mask" style={{marginTop:'.18rem'}}>{userInfo.order_num}</a>
                        </span>
                    &nbsp;
                        <span>
                            <img className="log-give" src="images/loggedIn/log_coin.png" alt=""/>
                            <a className="log-give-mask sp">{userInfo.order_money}</a>
                        </span>
                </div>
            </div>
    }
}