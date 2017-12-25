'use strict'
//累计赚取
import React from 'react';
import Pages from './../../InvestPc/Plist/Pages';
import Http from './../../../../../controller/pcapi';
import echarts from 'echarts';
import NoDate from './../../../../../widget/NoDate';

export default class AccumulatedEarn extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            curIndex: 0,
            accountInfo: {},
            totalPage:0,
            navList:['待结算佣金','已结算佣金'],
            list:[],
            fundInfo:{},
            commStatus:''
        }
    }

    skipPage(curPage){
        this.fetchList(this.state.commStatus,curPage);
    }

    fetchList(comm_status,page_no){
        Http.CommInfo({comm_status,page_no}).success(function (source, next) {   //累计赚取
            this.setState({
                list:source.data.rows,
                fundInfo:source.data,
                totalPage:source.data.page_count
            })
            this.initPieChart();
        }.bind(this))
    }

    changeNav(index){
        switch(index){
            case 0:
                this.setState({
                    curIndex:index,
                    commStatus:2
                })
                this.fetchList(2,1)
                break;
            case 1:
                this.setState({
                    curIndex:index,
                    commStatus:1
                })
                this.fetchList(1,1)
                break;
            //case 2:
            //    this.setState({
            //        curIndex:index,
            //        commStatus:3
            //    })
                //Http.TicketsList({page_no:1}).success(function (source, next) {   //我的奖励
                //    this.setState({
                //        list:source.data.rows
                //    })
                //}.bind(this))
                //break;
        }
    }

    initPieChart() {
        let myChart = echarts.init(this.refs.pieChart);
        let fundInfo = this.state.fundInfo;
        let option = {
            legend: {
                orient: 'vertical',
                x: 'right'
            },
            series: [
                {
                    name:'佣金',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap:false,
                    hoverAnimation:false,
                    color:['#FBA631','#F76359','#2C65A3'],
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        fundInfo && fundInfo.comm_will.replace(/,/g, ""),
                        fundInfo && fundInfo.comm_done.replace(/,/g, ""),
                        fundInfo && fundInfo.reward_amount.replace(/,/g, "")
                    ]
                }
            ]
        };
        myChart.setOption(option);
    }

    componentDidMount(){
        this.fetchList(2,1);
    }

    render(){
        return <div className="user-right">
            <div className="earn">
                <h3 className="earn-tit">累计赚取金额(元): <span>{this.state.fundInfo.comm_all}</span></h3>
                <div className="proportion">
                    <div className="proportion_l"><div className="pro-pink" ref="pieChart"></div></div>
                    <div className="proportion_r">
                        <p><em className="yellow"></em> <span>待结算佣金 (元) </span> {this.state.fundInfo.comm_will}</p>
                        <p><em className="red"></em> <span>已结算佣金 (元) </span> {this.state.fundInfo.comm_done}</p>
                        <p><em className="blue1"></em> <span>奖励 (元) </span> {this.state.fundInfo.reward_amount}</p>
                    </div>
                </div>
            </div>
            <div className="order-list">
                <div className="earn-item-tit">
                    {
                        this.state.navList && this.state.navList.map(function(item,index){
                            return  <a key={index} className={this.state.curIndex==index?'active':''} onClick={()=>this.changeNav(index)}>{item}</a>
                        }.bind(this))
                    }
                </div>
                {
                    this.state.list && this.state.list.length?<div>
                        {
                            this.state.list && this.state.list.map((function(item,index){
                                return <div key={index} className="order-item">
                                    <h4 className="order-number">
                                        订单编号：{item.order_id} <span>{item.time}</span>
                                    </h4>
                                    <h6 className="order-name"><em className="txt01">{item.fund_type_str}</em>{item.fund_name}<em className="txt02">{item.status_str}</em></h6>
                                    <ul className="order-item-info">
                                        <li className="order-item-role role1">
                                            <p className="txt_1 orange">{item.comm}元</p>
                                            <p className="txt_2">前端佣金</p>
                                        </li>
                                        <li className="order-item-role">
                                            <p className="txt_1">{item.investor_name}</p>
                                            <p className="txt_2">投资人</p>
                                        </li>
                                        <li className="order-item-role">
                                            <p className="txt_1"> {item.amount} </p>
                                            <p className="txt_2">投资金额</p>
                                        </li>
                                    </ul>
                                </div>
                            }))
                        }
                        <Pages key={this.state.curIndex} onClick={this.skipPage.bind(this)} totalPage={this.state.totalPage}/>
                    </div>:<NoDate/>
                }
        </div>
</div>
    }
}
