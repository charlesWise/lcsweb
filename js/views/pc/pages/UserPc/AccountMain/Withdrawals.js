'use strict'
//提现
import React from 'react';
import Http from './../../../../../controller/pcapi';
import Pages from './../../InvestPc/Plist/Pages';
import Prompt from '../../../../../widget/Prompt';
import NoDate from './../../../../../widget/NoDate';

export default class Withdrawals extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            curIndex:0,
            isShowResult:false,
            totalPage:'',
            list:[],
            showTypes:false,
            curType:'全部',
            cashList:[],
            status:0,
            showBankModal:false,
            accountAmount:'',
            bankList:[],
            detailInfo:{},
        }
    }

    select(index){
        this.setState({
            curIndex:index
        })
        if(index){
            this.fetchData(0,1)
        }
    }

    skipPage(curPage){
        this.fetchData(this.state.status,curPage);
    }

    //fetchData(status,page_no){
    fetchData(status,page_no){
        Http.outList({status,page_no}).success((source, next) => {   //提现记录
            if(source.boolen){
                this.setState({
                    cashList:source.data.result,
                    totalPage:source.data.page_count
                })
            }else{
                window.Prompt.error(source.message);
            }
        }).error((e)=>{
            window.Prompt.error(e.message);
        })
    }

    selectType(type){
        switch (type) {
            case 1:
                this.setState({
                    showTypes:false,
                    curType:'全部',
                    status:0
                })
                this.fetchData(0,1);
                break;
            case 2:
                this.setState({
                    showTypes:false,
                    curType:'成功',
                    status:2
                })
                this.fetchData(2,1);
                break;
            case 3:
                this.setState({
                    showTypes:false,
                    curType:'失败',
                    status:3
                })
                this.fetchData(3,1);
                break;
            case 4:
                this.setState({
                    showTypes:false,
                    curType:'处理中',
                    status:7
                })
                this.fetchData(1,1);
                break;
        }
    }

    changeStatus(status){
        switch (status) {
            case '1' :
                return '待处理';
                break;
            case '2' :
                return '提现成功';
                break;
            case '3' :
                return '提现不批准（失败）';
                break;
            case '4' :
                return '取消申请';
                break;
            case '5' :
                return '转账中';
                break;
            case '6' :
                return '机器待处理';
                break;
            case '7' :
                return '机器处理中';
                break;
            case '8' :
                return '客服跟踪';
                break;
        }
    }

    cash(){
        let out_account_id = this.state.bankList && this.state.bankList[0] && this.state.bankList[0].bank_id;
        let amount = this.refs.cashMoney.value;
        let password = this.refs.cashPass.value;
        Http.cashout({out_account_id,amount,password}).success((source, next) => {   //提现
            if(source.boolen){
                window.Prompt.success(source.message,()=>{
                    this.setState({
                        isShowResult:true,
                    })
                    this.cashResult(source.data.cashout_id)
                });
            }else{
                window.Prompt.error(source.message);
            }
        }).error((e)=>{
            window.Prompt.error(e.message);
        })
    }

    cashResult(id){
        Http.outdetail({id}).success((data, next) => {   //提现详情
            this.setState({
                isShowResult:true,
                detailInfo:data.data
            })
        })
    }

    checkDefaultBank(){
        Http.getBankList({}).success((source, next) => {   //银行卡列表
            this.setState({
                bankList:source && source.data && source.data.rows
            })
        })

        Http.applyCash({}).success((source, next) => {   //绑定银行卡
            this.setState({
                accountAmount:source && source.data.account_amount,
            })
        })
    }

    _addCard() {
        let bank = this.refs.bankInfo.bank || {};
        let bank_account = this.refs.bank_account.value;
        let account_holder = this.refs.account_holder.value;
        let person_id = this.refs.person_id.value;
        if (!bank.bank_code || !bank_account || !account_holder || !person_id) return;
        Http.addCard({
            bank_id: 0,
            bank_code: bank.bank_code,
            out_account_no: bank_account,
            real_name: account_holder,
            person_id: person_id,
            client_type: 'pc'
        }).success((data, next)=>{
            if(data.boolen==1){
                window.Prompt.success(data.message,()=>{
                    this.setState({
                        showBankModal:false
                    })
                    this.checkDefaultBank();
                });
                //this.props.selected && this.props.selected(14)
            }else{
                alert(data.message);
                window.Prompt.error(data.message);
            }
        }).error((data)=>{
            window.Prompt.error(data.message);
        })
    }

    getTime(){
        let curDate = new Date();
        let nextDate = new Date(curDate.getTime() + 24*60*60*1000); //后一天
        let month = nextDate.getMonth()+1;
        let day = nextDate.getDate();
        return `${month}月${day}日`;
    }


    componentDidMount(){
        this.checkDefaultBank();
    }

    render(){
        return <div className="user-right">
            <div className={this.state.showBankModal?"bomb-box":'dn'}>
                <div className="modify modify-add-card">
                    <a className="closed" onClick={()=>this.setState({showBankModal:false})}></a>
                    <p className="bomb-box-p">添加银行卡</p>
                    <p>
                        <label>姓名:</label>
                        <input ref='account_holder' type="text" className="width238" placeholder="请输入姓名" />
                    </p>
                    <p>
                        <label>身份证:</label>
                        <input ref='person_id' type="text" placeholder="请输入身份证号码" />
                    </p>
                    <p className="yinhang">
                        <label>银行:</label>
                        <PrettySelect ref='bankInfo'/>
                    </p>
                    <p>
                        <label>卡号:</label>
                        <input ref='bank_account' type="text" placeholder="请输入银行卡号" />
                    </p>
                    <p><button onClick={this._addCard.bind(this)}>提交保存</button>
                        <span>*单笔限额30万元，单日限额50万元，单月限额100万元</span>
                    </p>
                </div>
                <div className="mask"></div>
            </div>
            
            <div className="order-list">
                <div className="earn-item-tit fund-tit">
                    <a className={this.state.curIndex==0?"active":''} onClick={()=>this.select(0)}> 提现 </a>
                    <a className={this.state.curIndex==1?"active":''} onClick={()=>this.select(1)}>提现记录</a>
                </div>
                {
                    this.state.curIndex?<div className="contract_list">
                        <div className="fund-sel">类型
                            <div className="fund-set">
                                <p className="" onClick={()=>this.setState({showTypes:!this.state.showTypes})}>{this.state.curType} <i></i></p>
                                <ul className={this.state.showTypes?"fund-new":"dn"}>
                                    <li onClick={()=>this.selectType(1)}>全部</li>
                                    <li onClick={()=>this.selectType(2)}>成功</li>
                                    <li onClick={()=>this.selectType(3)}>失败</li>
                                    <li onClick={()=>this.selectType(4)}>处理中</li>
                                </ul>
                            </div>
                        </div>
                        {
                            this.state.cashList && this.state.cashList.length?
                                <div className="fund">
                                    <ul><li>提现时间</li><li>提现银行</li><li>提现金额(元)</li><li>状态</li><li>备注</li></ul>
                                    {
                                        this.state.cashList && this.state.cashList.map(((item,index)=>{
                                            return <ul key={index}>
                                                <li>{item.ctime}</li>
                                                <li>{item.sub_bank}</li>
                                                <li>{item.money}</li>
                                                <li>{this.changeStatus(item.status)}</li>
                                                <li>{item.remark}</li>
                                            </ul>
                                        }))
                                    }
                                </div>:<NoDate/>
                        }
                        <Pages key={this.state.status} onClick={this.skipPage.bind(this)} totalPage={this.state.totalPage}/>
                    </div>:
                        this.state.isShowResult?<div className="step">
                            <div className="ui-step-wrap">
                                <div className="ui-step-bg"></div>
                                <div className="ui-step-progress" style={{width:'210px'}}></div>
                                <ul className="ui-step">
                                    <li className="ui-step-item active">
                                        <div className="ui-step-item-num"><span></span></div>
                                        <div className="ui-step-item-title">
                                            <p>提现申请</p>
                                            <p>{this.state.detailInfo.ctime}</p>
                                        </div>
                                    </li>
                                    <li className="ui-step-item active">
                                        <div className="ui-step-item-num"><span></span></div>
                                        <div className="ui-step-item-title">
                                            <p>审核中</p>
                                            <p>{this.state.detailInfo.ctime}</p>
                                        </div>
                                    </li>
                                    <li className="ui-step-item">
                                        <div className="ui-step-item-num"><span></span></div>
                                        <div className="ui-step-item-title">
                                            <p>提现成功</p>
                                            <p></p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="tx-div">
                                <div className="tx-line">提现金额:<em>{this.state.detailInfo.money}元</em></div>
                                <div className="bank-card">
                                    <img src={`/images/userPc/bank/${this.state.bankList && this.state.bankList[0] && this.state.bankList[0].bank_code}.png`} width="115" height="34" />
                                    <span className="div-y">尾号{this.state.bankList && this.state.bankList[0] && this.state.bankList[0].bank_account && this.state.bankList[0].bank_account.slice(-4)}<em>储蓄卡</em></span>
                                </div>
                                <div className="tx-line" style={{cursor:'pointer'}} onClick={()=>this.select(1)}>查看提现记录>></div>
                            </div>
                        </div>
                            :
                        <div className="withdraw">
                            <div className="withdraw-line">
                                <label>提现银行卡:</label>
                                {
                                    this.state.bankList && this.state.bankList.length?<div className="bank-card">
                                        <img src={`/images/userPc/bank/${this.state.bankList && this.state.bankList[0] && this.state.bankList[0].bank_code}.png`} width="115" height="34" />
                                        <span className="div-y">尾号{this.state.bankList && this.state.bankList[0] && this.state.bankList[0].bank_account && this.state.bankList[0].bank_account.slice(-4)}<em>储蓄卡</em></span>
                                    </div>:
                                    <div className="add-bank-card" onClick={()=>this.setState({showBankModal:true})} style={{marginLeft:0}}>
                                        <img src="/images/userPc/icon-jia.png" width="36" height="30" />
                                        <span className="">添加银行卡</span>
                                    </div>
                                }
                            </div>
                            <div className="withdraw-line">
                                <label>账户余额:</label>
                                <div className="tx-money">{this.state.accountAmount || 0}元 <span className="red" onClick={()=>this.refs.cashMoney.value=this.state.accountAmount} style={{cursor:'pointer'}}>全部提现</span></div>
                            </div>
                            <div className="withdraw-line">
                                <label>提现金额:</label>
                                <input type="text" placeholder="请输入提现金额" ref="cashMoney"/>
                                <p className="tips">预计到账时间：{this.getTime()}24:00前</p>
                                <em className="unit">元</em>
                            </div>
                            <div className="withdraw-line">
                                <label>提现密码:</label>
                                <input type="text" placeholder="请输入密码" ref="cashPass"/>
                            </div>
                            <div className="withdraw-line"><button onClick={()=>this.cash()}>确认提现</button></div>
                            <div className="tx-tips">*单笔限额30万元，单日限额50万元，单月限额100万元</div>
                        </div>
                }
        </div>
</div>
    }
}


class PrettySelect extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {
            bank_code: '',
            bank_name: '',
            bankList: [],
            show: false
        };
        this.bank = {}
    }

    componentDidMount() {
        Http.getSelectBankList({}).success((data, next)=>{
            let bankList = data.data && data.data.rows;
            this.setState({
                bankList: bankList
            })
        })
    }

    _getBank(bank){
        this.bank = bank;
        this.setState({
            show: false,
            bank_code: bank.bank_code,
            bank_name: bank.bank_name,
        })
    }

    _getClassName() {
        if(this.state.show){
            return {
                arrow: 'pull',
                list: 'region'
            }
        }else{
            return {
                arrow: 'drop-down',
                list: 'region dn'
            }
        }
    }

    render() {
        let classNames = this._getClassName();
        return (
            <div className="select-region" style={{marginLeft:'20px'}}>
                <div className="sel-inner" onClick={()=>{
                    this.setState({
                        show: !this.state.show
                    })
                }}>
                    {this.state.bank_code ? this.state.bank_name : '请选择'} <i className={classNames.arrow}></i>
                </div>
                <div className={classNames.list}>
                    <ul>
                        {
                            this.state.bankList.map((item, index)=>{
                                return (
                                    <li key={index} onClick={this._getBank.bind(this, item)}>{item.bank_name}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}