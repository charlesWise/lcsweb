'use strict'
//提现记录
import React from 'react';
import Http from './../../../../../controller/pcapi';

export default class PresentRecord extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            curIndex:0,
            list:[1,2,3,4,5,6],
        }
    }

    selected(index) {
        this.setState({
            curIndex: index
        })
    }

    render(){
        return <div className="user-right">
            <div className="order-list">
                <div className="earn-item-tit fund-tit">
                    <a> 提现 </a>
                    <a className="active">提现记录</a>
                </div>
            <div className="contract_list">
                <div className="fund-sel">类型
                    <div className="fund-set">
                        <p className="">全部 <i></i></p>
                        <ul className="fund-new" style={{display:'block'}}>
                            <li>成功</li>
                            <li>失败</li>
                            <li>处理中</li>
                        </ul>
                    </div>
                </div>
                <div className="present">
                    <ul><li>提现时间</li><li>提现银行</li><li>提现金额(元)</li><li>状态</li><li>备注</li></ul>
                    {
                        this.state.list && this.state.list.map((function(item,index){
                            return <ul key={index}>
                                <li>2017-07-12</li>
                                <li>工商银行(6315)</li>
                                <li>100,000.00</li>
                                <li>处理中</li>
                                <li>提现至中国农业银行，尾号6315</li>
                            </ul>
                        }.bind(this)))
                    }
                </div>

                <div className="pages">
                    <span className="jumppoint"><i className="jump-arr-lt"></i></span>
                    <span className="jumppoint">1</span>
                    <span className="jumppoint" className="current">2</span>
                    <span className="jumppoint">3</span>
                    <span className="jumppoint">4</span>
                    <span> … </span>
                    <span className="jumppoint"><i className="jump-arr-gt"></i></span>
                    <span>共14页</span>
                    <span className="jumppoint-input"> 到第<input type="text"/>页 </span>
                    <span className="jumppoint-btn">确定</span>
                </div>
            </div>
        </div>
</div>
    }
}
