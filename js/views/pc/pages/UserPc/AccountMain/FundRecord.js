'use strict'
//资金记录
import React from 'react';
import Http from './../../../../../controller/pcapi';
import Pages from './../../InvestPc/Plist/Pages';
import NoDate from './../../../../../widget/NoDate';

export default class FundRecord extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            curIndex:0,
            list:[],
            totalPage:6,
            showTypes:false,
            curType:'全部',
            curTypeNum:0
        }
    }

    skipPage(curPage){
        this.fetchData(this.state.curTypeNum,curPage);
    }

    fetchData(type,page_no){
        Http.oneType({type,page_no}).success(function (source, next) {   //资金记录
            this.setState({
                list:source.data.result,
                totalPage:source.data.page_count
            })
        }.bind(this))
    }

    selectType(type){
        switch (type) {
            case 1:
                this.setState({
                    showTypes:false,
                    curType:'全部',
                    curTypeNum:0
                })
                this.fetchData(0,1);
                break;
            case 2:
                this.setState({
                    showTypes:false,
                    curType:'返佣',
                    curTypeNum:1
                })
                this.fetchData(1,1);
                break;
            case 3:
                this.setState({
                    showTypes:false,
                    curType:'奖励',
                    curTypeNum:4
                })
                this.fetchData(4,1);
                break;
            case 4:
                this.setState({
                    showTypes:false,
                    curType:'提现',
                    curTypeNum:2
                })
                this.fetchData(2,1);
                break;
        }
    }

    changeText(type){
        switch(type){
            case '1':
                return '佣金'
            case '2':
                return '佣金冻结 '
            case '3':
                return '佣金解冻'
            case '4':
                return '提现'
            case '5':
                return '提现冻结'
            case '6':
                return '提现解冻'
            case '7':
                return '提现手续费'
            case '8':
                return '充值'
            case '9':
                return '奖励'
        }
    }

    componentDidMount(){
        this.fetchData(0,1)
    }

    render(){
        return <div className="user-right">
        <h3 className="record-tit">资金记录</h3>
    <div className="contract_list">
        <div className="fund-sel">类型
            <div className="fund-set">
                <p className="" onClick={()=>this.setState({showTypes:!this.state.showTypes})}>{this.state.curType} <i></i></p>
                <ul className={this.state.showTypes?"fund-new":"dn"}>
                    <li onClick={()=>this.selectType(1)}>全部</li>
                    <li onClick={()=>this.selectType(2)}>返佣</li>
                    <li onClick={()=>this.selectType(3)}>奖励</li>
                    <li onClick={()=>this.selectType(4)}>提现</li>
                </ul>
            </div>
        </div>
        {
            this.state.list && this.state.list.length?<div>
                <div className="fund">
                    <ul><li>类型</li><li>交易金额(元)</li><li>交易后金额(元)</li><li>时间</li><li>备注</li></ul>
                    {
                        this.state.list && this.state.list.map((function(item,index){
                            return <ul key={index}>
                                <li>{this.changeText(item.obj_type)}</li>
                                <li>{item.change_money}</li>
                                <li>{item.to_money}</li>
                                <li>{item.ctime}</li>
                                <li>{item.remark}</li>
                            </ul>
                        }.bind(this)))
                    }
                </div>
                <Pages key={this.state.curTypeNum} onClick={this.skipPage.bind(this)} totalPage={this.state.totalPage}/>
            </div>:<NoDate/>
        }
    </div>
</div>
    }
}
