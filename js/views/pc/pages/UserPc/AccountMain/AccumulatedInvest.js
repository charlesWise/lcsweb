'use strict'
//累计投资
import React from 'react';
import Pages from './../../InvestPc/Plist/Pages';
import Http from './../../../../../controller/pcapi';
import echarts from 'echarts';
import NoDate from './../../../../../widget/NoDate';

export default class AccumulatedInvest extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            curIndex: 0,
            accountInfo: {},
            totalMoney:'',
            totalPage:0,
            navList:['集合信托','资管计划','债权基金','股权基金','证券基金'],
            list:[],
            fundType:4
        }
    }

    changeNav(index){
        switch(index){
            case 0:
                this.setState({
                    curIndex:index
                })
                this.fetchList(4,1)
                break;
            case 1:
                this.setState({
                    curIndex:index
                })
                this.fetchList(6,1)
                break;
            case 2:
                this.setState({
                    curIndex:index
                })
                this.fetchList(5,1)
                break;
            case 3:
                this.setState({
                    curIndex:index
                })
                this.fetchList(3,1)
                break;
            case 4:
                this.setState({
                    curIndex:index
                })
                this.fetchList(2,1)
                break;
        }
    }

    skipPage(curPage){
        this.fetchList(curPage);
    }

    fetchList(fund_type,page_no){
        Http.CommInfo({fund_type,page_no,limit:5}).success(function (source, next) {   //累计投资
            this.setState({
                list:source.data.rows,
                totalPage:source.data.page_count
            })
        }.bind(this))
    }

    fetchAccountInfo(){
        Http.getAccountInfo({}).success(function (source, next) {   //资金信息
            this.setState({
                accountInfo:source.data.info.order_amount_detail,
                totalMoney:source.data.info.amount
            })
            this.initPieChart();
        }.bind(this))
    }

    initPieChart() {
        let myChart = echarts.init(this.refs.pieChart);
        let fundInfo = this.state.accountInfo;
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
                    color:['#FBA631','#5FC2FC','#F76359','#649FFF','#2C65A3'],
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
                        fundInfo && fundInfo[3] && fundInfo[3].amount && fundInfo[3].amount.replace(/,/g, ""),
                        fundInfo && fundInfo[2] && fundInfo[2].amount && fundInfo[2].amount.replace(/,/g, ""),
                        fundInfo && fundInfo[5] && fundInfo[5].amount && fundInfo[5].amount.replace(/,/g, ""),
                        fundInfo && fundInfo[1] && fundInfo[1].amount && fundInfo[1].amount.replace(/,/g, ""),
                        fundInfo && fundInfo[4] && fundInfo[4].amount && fundInfo[4].amount.replace(/,/g, "")
                    ]
                }
            ]
        };
        myChart.setOption(option);
    }

    componentDidMount(){
        this.fetchList(4,1);
        this.fetchAccountInfo();
    }

    render(){
        return <div className="user-right">
            <div className="earn">
                <h3 className="earn-tit">累计投资(万元): <span>{this.state.totalMoney}</span></h3>
                <div className="proportion">
                    <div className="proportion_l"><div className="pro-yellow" ref="pieChart"></div></div>
                    <div className="proportion_r ald-invest">
                        <p><em className="yellow"></em> <span>集合信托</span> {this.state.accountInfo && this.state.accountInfo[3] && this.state.accountInfo[3].amount}万元</p>
                        <p><em className="blue3"></em> <span>股权基金</span> {this.state.accountInfo && this.state.accountInfo[2] && this.state.accountInfo[2].amount}万元</p>
                        <p><em className="red"></em> <span>资管计划</span> {this.state.accountInfo && this.state.accountInfo[5] && this.state.accountInfo[5].amount}万元</p>
                        <p><em className="blue2"></em> <span>证券基金</span> {this.state.accountInfo && this.state.accountInfo[1] && this.state.accountInfo[1].amount}万元</p>
                        <p><em className="blue1"></em> <span>债权基金</span> {this.state.accountInfo && this.state.accountInfo[4] && this.state.accountInfo[4].amount}万元</p>
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
                                return <div className="order-item" key={index}>
                                    <h4 className="order-number">
                                        订单编号：{item.order_no} <span>{item.time}</span>
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
                                            <p className="txt_1"> {item.amount}万</p>
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
