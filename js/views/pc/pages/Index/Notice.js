'use strict'
//
import React from 'react';

export default class notice extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }

    render(){
        let list = this.props.data || [];
        
        return (
            <div className="shs-mains">
                <div className="shs-jz">
                    <ul className="shs-nav">
                        <li className="nav-li1">
                            <img src="/images/index/sy-tu1.png" className="bav-bej" />
                            <div className="nav-wz">
                                <h2>优质产品</h2>
                                <p>百亿优质包销产品精选提供</p>
                            </div>
                        </li>
                        <li className="nav-li2">
                            <img src="/images/index/sy-tu2.png" className="bav-bej" />
                            <div className="nav-wz">
                                <h2>快速结佣</h2>
                                <p>全国首家佣金线上结算，财富快人一步</p>
                            </div>
                        </li>
                        <li className="nav-li3">
                            <img src="/images/index/sy-tu3.png" className="bav-bej" />
                            <div className="nav-wz">
                                <h2>上市公司背景</h2>
                                <p>拥有香港主板上市公司（00850.HK）背景</p>
                            </div>
                        </li>
                        <li className="nav-li4">
                            <img src="/images/index/sy-tu4.png" className="bav-bej" />
                            <div className="nav-wz">
                                <h2>专属服务</h2>
                                <p>真正实现互联网+理财师一站式服务平台</p>
                            </div>
                        </li>
                    </ul>
                </div>
                {
                    list.length < 1 ? null :
                        <div className="index-notice"><img src="/images/index/index-notice.png" />
                            {list[0].title}
                            <a className="index-more" href="/aboutUs.html?type=3">更多公告 <i></i></a>
                        </div>
                }
            </div>
        )
    }
}
