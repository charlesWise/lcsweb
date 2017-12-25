'use strict'
//提现返回结果
import React from 'react';

import Http from './../../../../../controller/pcapi';

export default class WithdrawResult extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
        }
    }
    render(){
        return <div className="user-right">
            <div className="order-list">
                <div className="earn-item-tit fund-tit">
                    <a className="active"> 提现 </a>
                    <a>提现记录</a>
                </div>
                <div className="step">
                    <div className="ui-step-wrap">
                        <div className="ui-step-bg"></div>
                        <div className="ui-step-progress" style={{width:'210px'}}></div>
                        <ul className="ui-step">
                            <li className="ui-step-item active">
                                <div className="ui-step-item-num"><span></span></div>
                                <div className="ui-step-item-title">
                                    <p>提现申请</p>
                                    <p>2017-07-12  16:43</p>
                                </div>
                            </li>
                            <li className="ui-step-item active">
                                <div className="ui-step-item-num"><span></span></div>
                                <div className="ui-step-item-title">
                                    <p>审核中</p>
                                    <p>2017-07-12  16:43</p>
                                </div>
                            </li>
                            <li className="ui-step-item">
                                <div className="ui-step-item-num"><span></span></div>
                                <div className="ui-step-item-title">
                                    <p>提现成功</p>
                                    <p>2017-07-20  24:00前</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="tx-div">
                        <div className="tx-line">提现金额:<em>30,000.00元</em></div>   
                        <div className="bank-card">
                            <img src="/images/userPc/zhaoshang.png" width="115" height="34" />
                            <span className="div-y">尾号7912<em>储蓄卡</em></span>
                        </div>
                        <div className="tx-line">查看提现记录>></div>
                    </div>
                    
                </div>
        </div>
</div>
    }
}
